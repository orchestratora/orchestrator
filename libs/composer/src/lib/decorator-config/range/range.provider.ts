import { OptionRange } from '@orchestrator/core';

import { createDecoratorConfigFactory, provideDecoratorConfig } from '../token';
import { RangeComponent } from './range.component';

const rangeFactoryFn = createDecoratorConfigFactory<RangeComponent>(
  OptionRange,
  config => {
    config.component = RangeComponent;
  },
);

export function numberFactory() {
  return rangeFactoryFn();
}

export const rangeProvider = provideDecoratorConfig(numberFactory);
