import { Injector } from '@angular/core';
import { Property } from '@orchestrator/gen-io-ts';
import * as t from 'io-ts';

import { addConfig } from '../../metadata/configuration';
import { parseFunction } from '../../util';

export type CustomInjectorFactory = (parentInjector: Injector) => Injector;

export interface FunctionMeta {
  args: string[];
  body: string;
}

export interface FunctionWithMeta extends Function {
  args: string[];
  body: string;
}

export function isFunctionWithMeta(fn: Function): fn is FunctionWithMeta {
  return typeof fn === 'function' && 'args' in fn && 'body' in fn;
}

export const FunctionFromMeta = new t.Type<FunctionWithMeta, FunctionMeta>(
  'FunctionFromMeta',
  isFunctionWithMeta,
  (m, c) =>
    t.object.validate(m, c).chain((obj: FunctionMeta) => {
      if (
        obj === null ||
        !Array.isArray(obj.args) ||
        typeof obj.body !== 'string'
      ) {
        return t.failure(m, c);
      }

      obj.args.sort((arg1, arg2) => {
        const is1Custom = arg1.startsWith('$');
        const is2Custom = arg2.startsWith('$');

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
  fn => ({ args: fn.args, body: fn.body }),
);

export const FunctionFromString = new t.Type<FunctionWithMeta, string>(
  'FunctionFromString',
  isFunctionWithMeta,
  (m, c) =>
    t.string.validate(m, c).chain(s => {
      try {
        return FunctionFromMeta.validate(parseFunction(s), c);
      } catch {
        return t.failure(s, c);
      }
    }),
  fn => fn.toString(),
);

export const FunctionWithMeta = new t.Type<FunctionWithMeta, Function>(
  'FunctionWithMeta',
  isFunctionWithMeta,
  (m, c) =>
    t.Function.validate(m, c).chain(f => {
      try {
        return FunctionFromMeta.validate(parseFunction(f.toString()), c);
      } catch {
        return t.failure(f, c);
      }
    }),
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
