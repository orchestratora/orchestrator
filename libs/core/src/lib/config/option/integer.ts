import { Property } from '@orchestrator/gen-io-ts';
import { Int } from 'io-ts';

import { addConfig } from '../../metadata/configuration';

export function OptionInteger(): PropertyDecorator {
  const decorator = Property({ typeFactory: () => Int });
  return (target, prop) => {
    decorator(target, prop);
    addConfig(target, { prop, decorator: OptionInteger, args: [] });
  };
}
