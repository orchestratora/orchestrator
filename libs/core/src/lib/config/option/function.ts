import { Injector } from '@angular/core';
import { Property } from '@orchestrator/gen-io-ts';
import { chain } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';

import { addConfig } from '../../metadata/configuration';
import { parseFunction } from '../../util';

export type CustomInjectorFactory = (parentInjector: Injector) => Injector;

export interface FunctionMeta {
  args: string[];
  body: string;
}

export interface FunctionWithMeta extends Function, FunctionMeta {}

export const CUSTOM_FUNCTION_ARGUMENT_PREFIX = '$';

export const FunctionFromMeta = new t.Type<FunctionWithMeta, FunctionMeta>(
  'FunctionFromMeta',
  isFunctionWithMeta,
  (m, c) =>
    pipe(
      t.UnknownRecord.validate(m, c),
      chain(obj => {
        if (!hasFunctionMeta(obj)) {
          return t.failure(m, c);
        }

        // Move custom arguments to the end
        obj.args.sort((arg1, arg2) => {
          const is1Custom = arg1.startsWith(CUSTOM_FUNCTION_ARGUMENT_PREFIX);
          const is2Custom = arg2.startsWith(CUSTOM_FUNCTION_ARGUMENT_PREFIX);

          if (is1Custom === is2Custom) {
            return 0;
          }

          return is1Custom ? 1 : -1;
        });

        const fn = new Function(...obj.args, obj.body) as FunctionWithMeta;
        fn.args = obj.args;
        fn.body = obj.body;

        return t.success(fn);
      }),
    ),
  fn => ({ args: fn.args, body: fn.body }),
);

export const FunctionFromString = new t.Type<FunctionWithMeta, string>(
  'FunctionFromString',
  isFunctionWithMeta,
  (m, c) =>
    pipe(
      t.string.validate(m, c),
      chain(str => {
        try {
          return FunctionFromMeta.validate(parseFunction(str), c);
        } catch {
          return t.failure(str, c);
        }
      }),
    ),
  fn => fn.toString(),
);

export const FunctionWithMeta = new t.Type<FunctionWithMeta, Function>(
  'FunctionWithMeta',
  isFunctionWithMeta,
  (m, c) =>
    pipe(
      t.Function.validate(m, c),
      chain(fn => {
        try {
          // Reconstruct function from string to reorder arguments
          return FunctionFromString.validate(fn.toString(), c);
        } catch {
          return t.failure(fn, c);
        }
      }),
    ),
  fn => fn,
);

export function OptionFunction(
  customInjector?: CustomInjectorFactory,
): PropertyDecorator {
  const decorator = Property({
    typeFactory: () =>
      t.union([FunctionFromString, FunctionFromMeta, FunctionWithMeta]),
  });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, {
      prop,
      decorator: OptionFunction,
      args: [customInjector],
    });
  };
}

function hasFunctionMeta(obj: any): obj is FunctionMeta {
  return obj && Array.isArray(obj.args) && typeof obj.body === 'string';
}

function isFunctionWithMeta(fn: any): fn is FunctionWithMeta {
  return typeof fn === 'function' && hasFunctionMeta(fn);
}
