import { Property } from '@orchestrator/gen-io-ts';

import { OptionAllowedValues } from './allowed-values';
import { OptionInteger } from './integer';
import { OptionRange } from './range';
import { OptionRequired } from './required';
import { OptionType } from './type';

export interface OptionConfig {
  required?: boolean;
  type?: any;
  range?: { min: number; max: number; step?: number };
  integer?: boolean;
  allowedValues?: any[];
}

export function Option(config: OptionConfig = {}): PropertyDecorator {
  const decorator = Property();

  const decorators = Object.keys(config)
    .map((key: keyof OptionConfig) => {
      switch (key) {
        case 'required':
          return config.required ? OptionRequired() : null;
        case 'type':
          return OptionType(config.type);
        case 'range':
          return OptionRange(
            config.range.min,
            config.range.max,
            config.range.step,
          );
        case 'integer':
          return config.integer ? OptionInteger() : null;
        case 'allowedValues':
          return OptionAllowedValues(...config.allowedValues);
      }
    })
    .filter(Boolean);

  return (target, prop) => {
    decorator(target, prop);
    decorators.forEach(d => d(target, prop));
  };
}
