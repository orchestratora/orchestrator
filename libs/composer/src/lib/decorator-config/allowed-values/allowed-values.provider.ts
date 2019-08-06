import { OptionAllowedValues } from '@orchestrator/core';

import { createDecoratorConfigFactory, provideDecoratorConfig } from '../token';
import { AllowedValuesComponent } from './allowed-values.component';

const allowedValuesFactoryFn = createDecoratorConfigFactory<
  AllowedValuesComponent
>(OptionAllowedValues, (config, [options]) => {
  const areOptionsDeterministic = options.every(
    opt => typeof opt !== 'function',
  );
  if (areOptionsDeterministic) {
    config.component = AllowedValuesComponent;
    config.extras.options = options;
  }
});

export function allowedValuesFactory() {
  return allowedValuesFactoryFn();
}

export const allowedValuesProvider = provideDecoratorConfig(
  allowedValuesFactory,
);
