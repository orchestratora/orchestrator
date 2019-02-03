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

export const FunctionFromMeta = new t.Type<FunctionWithMeta, FunctionMeta>(
  'FunctionFromMeta',
  (fn): fn is FunctionWithMeta => typeof fn === 'function',
  (m, c) =>
    t.object.validate(m, c).chain((obj: FunctionMeta) => {
      if (
        !Array.isArray(obj.args) ||
        typeof obj.body === 'object' ||
        !obj.body
      ) {
        return t.failure(m, c);
      }

      const fn = new Function(...obj.args, obj.body) as FunctionWithMeta;
      fn.args = obj.args;
      fn.body = obj.body;

      return t.success(fn);
    }),
  fn => ({ args: fn.args, body: fn.body }),
);

export const FunctionFromString = new t.Type<FunctionWithMeta, string>(
  'FunctionFromString',
  (fn): fn is FunctionWithMeta => typeof fn === 'function',
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

export function OptionFunction(
  customInjector?: CustomInjectorFactory,
): PropertyDecorator {
  const decorator = Property({
    typeFactory: () =>
      t.union([FunctionFromString, FunctionFromMeta, t.Function]),
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
