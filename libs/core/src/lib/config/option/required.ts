import { Property } from '@orchestrator/gen-io-ts';

import { addConfig } from '../../metadata/configuration';

export function OptionRequired(): PropertyDecorator {
  const decorator = Property({ isRequired: true });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionRequired, args: [] });
  };
}
