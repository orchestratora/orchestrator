import { Type } from '@angular/core';
import { Validation } from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';

import { ConfigurationErrorStrategy } from './configuration-error-strategy';

class ConfigurationError extends Error {
  constructor(component: Type<any>, validation: Validation<any>, config?: any) {
    const paths = PathReporter.report(validation).join('\n');
    super(
      `Invalid configuration for component ${component.name}'s config:
      ${paths}

      Actual config: ${config ? JSON.stringify(config, null, 2) : config}`,
    );
  }
}

export class ThrowConfigurationErrorStrategy extends ConfigurationErrorStrategy {
  handle<C>(validation: Validation<any>, type: Type<C>, config: C): void {
    throw new ConfigurationError(type, validation, config);
  }
}
