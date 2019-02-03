import { Injector } from '@angular/core';
import { Property } from '@orchestrator/gen-io-ts';
import * as t from 'io-ts';

import { addConfig } from '../../metadata/configuration';
import { parseFunction } from '../../util';

export type CustomInjectorFactory = (parentInjector: Injector) => Injector;

export const FunctionFromString = new t.Type<Function, string>(
  'FunctionFromString',
  (fn): fn is Function => typeof fn === 'function',
  (m, c) =>
    t.string.validate(m, c).chain(s => {
      try {
        const fnInfo = parseFunction(s);

        if (!fnInfo) {
          return t.failure(s, c);
        }

        const fn = new Function(...fnInfo.args, fnInfo.body);

        return t.success(fn);
      } catch {
        return t.failure(s, c);
      }
    }),
  a => a.toString(),
);

export function OptionFunction(
  customInjector?: CustomInjectorFactory,
): PropertyDecorator {
  const decorator = Property({
    typeFactory: () => t.union([FunctionFromString, t.Function]),
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
