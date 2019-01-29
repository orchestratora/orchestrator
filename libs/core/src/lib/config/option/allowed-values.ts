import { anyOf, Property } from '@orchestrator/gen-io-ts';

import { addConfig } from '../../metadata/configuration';

export function OptionAllowedValues(...values: any[]): PropertyDecorator {
  const decorator = Property({ type: anyOf(...values) });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionAllowedValues, args: [values] });
  };
}
