import { Property } from '@orchestrator/gen-io-ts';
import { refinement } from 'io-ts';

import { addConfig } from '../../metadata/configuration';

export function OptionRange(
  min: number,
  max: number,
  step: number = 1,
): PropertyDecorator {
  const typeFactory = (type: any) =>
    refinement(type, n => n >= min && n <= max, 'InRange');
  const decorator = Property({ type: Number, typeFactory });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionRange, args: [min, max, step] });
  };
}
