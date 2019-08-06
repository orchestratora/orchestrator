import {
  createDecoratorInitFactory,
  provideInitialDecoratorConfig,
} from '../token';
import { SwitchComponent } from './switch.component';

const switchFactoryFn = createDecoratorInitFactory((config, _, type) => {
  if (type === Boolean) {
    config.component = SwitchComponent;
  }
});

export function switchFactory() {
  return switchFactoryFn();
}

export const switchProvider = provideInitialDecoratorConfig(switchFactory);
