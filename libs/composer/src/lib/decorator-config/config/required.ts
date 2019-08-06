import { Validators } from '@angular/forms';
import { OptionRequired } from '@orchestrator/core';

import { createDecoratorConfigFactory, provideDecoratorConfig } from '../token';

export const requiredConfigFactoryFn = createDecoratorConfigFactory(
  OptionRequired,
  config => {
    config.validators.push(Validators.required);
    config.required = true;
  },
);

export function requiredConfigFactory() {
  return requiredConfigFactoryFn();
}

export const requiredConfigProvider = provideDecoratorConfig(
  requiredConfigFactory,
);
