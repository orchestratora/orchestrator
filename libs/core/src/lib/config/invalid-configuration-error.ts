import { Type } from '@angular/core';
import { Validation } from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';

export class InvalidConfigurationError<C> extends Error {
  component: Type<C>;
  validation: Validation<C>;
  config?: C;

  constructor(component: Type<C>, validation: Validation<any>, config?: any) {
    const paths = PathReporter.report(validation).join('\n');

    super(
      `Invalid configuration for component ${component.name}'s config:
      ${paths}

      Actual config: ${config ? JSON.stringify(config, null, 2) : config}`,
    );

    this.component = component;
    this.validation = validation;
    this.config = config;
  }
}
