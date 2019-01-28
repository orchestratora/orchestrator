import { Type } from '@angular/core';
import { Validation } from 'io-ts';

export abstract class ConfigurationErrorStrategy {
  abstract handle<C>(
    validation: Validation<any>,
    type: Type<C>,
    config: C,
  ): void;
}
