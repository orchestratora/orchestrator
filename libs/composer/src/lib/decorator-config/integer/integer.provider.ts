import { Validators } from '@angular/forms';
import { OptionInteger, OptionRange } from '@orchestrator/core';

import {
  createDecoratorConfigFactory,
  createDecoratorInitFactory,
  provideDecoratorConfig,
  provideInitialDecoratorConfig,
} from '../token';
import { IntegerComponent } from './integer.component';

const numberFactoryFn = createDecoratorInitFactory((config, _, type) => {
  if (type === Number) {
    config.component = IntegerComponent;
  }
});

const integerFactoryFn = createDecoratorConfigFactory<IntegerComponent>(
  OptionInteger,
  config => {
    config.component = IntegerComponent;
    config.validators.push(Validators.pattern(/^-?\d+$/));
  },
);

const rangeIndefiniteFactoryFn = createDecoratorConfigFactory<IntegerComponent>(
  OptionRange,
  (config, [min, max]) => {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      config.component = IntegerComponent;
    }
  },
);

export function numberFactory() {
  return numberFactoryFn();
}

export function integerFactory() {
  return integerFactoryFn();
}

export function rangeIndefiniteFactory() {
  return rangeIndefiniteFactoryFn();
}

export const numberProvider = provideInitialDecoratorConfig(numberFactory);
export const integerProvider = provideDecoratorConfig(integerFactory);
export const rangeIndefiniteProvider = provideDecoratorConfig(
  rangeIndefiniteFactory,
);
