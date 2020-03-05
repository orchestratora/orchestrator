import { Validators } from '@angular/forms';
import { OptionRange } from '@orchestrator/core';

import { createDecoratorConfigFactory, provideDecoratorConfig } from '../token';

export interface RangeConfigExtras {
  min: number;
  max: number;
  step?: number;
}

const rangeConfigFactoryFn = createDecoratorConfigFactory<RangeConfigExtras>(
  OptionRange,
  (config, [min, max, step = 1]) => {
    const isStepInt = Math.floor(step) === step;
    config.validators.push(Validators.min(min));
    config.validators.push(Validators.max(max));
    config.validators.push(
      Validators.pattern(isStepInt ? /^-?\d+$/ : /^-?\d+(?:\.\d+)?$/),
    );
    config.extras.min = min;
    config.extras.max = max;
    config.extras.step = step;
  },
);

export function rangeConfigFactory() {
  return rangeConfigFactoryFn();
}

export const rangeConfigProvider = provideDecoratorConfig(rangeConfigFactory);
