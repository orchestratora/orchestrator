import { Property } from '@orchestrator/gen-io-ts';

import { addConfig } from '../../metadata/configuration';

export function OptionType(type: any): PropertyDecorator {
  const decorator = Property({ type });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionType, args: [type] });
  };
}
