import { Property } from '@orchestrator/gen-io-ts';
import { brand, Branded } from 'io-ts';

import { addConfig } from '../../metadata/configuration';

export interface InRangeBrand {
  readonly InRange: unique symbol;
}

export function OptionRange(
  min: number,
  max: number,
  step: number = 1,
): PropertyDecorator {
  const typeFactory = (type: any) =>
    brand(
      type,
      (n): n is Branded<number, InRangeBrand> => n >= min && n <= max,
      'InRange',
    );
  const decorator = Property({ type: Number, typeFactory });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionRange, args: [min, max, step] });
  };
}
