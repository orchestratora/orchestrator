import { Type } from '@angular/core';
import { genIoType, Property } from '@orchestrator/gen-io-ts';
import { TypeFactory } from '@orchestrator/gen-io-ts/lib/metadata';

import { addConfig } from '../../metadata/configuration';

export function OptionTypeFactory<T>(
  typeFactory: TypeFactory<T>,
): PropertyDecorator {
  const decorator = Property({ typeFactory });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, {
      prop,
      decorator: OptionTypeFactory,
      args: [typeFactory],
    });
  };
}

export function classToType<T>(cls: Type<T>) {
  return genIoType<T>(cls);
}
