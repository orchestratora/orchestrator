import { Type } from '@angular/core';
import { Validation } from 'io-ts';

import { ConfigurationErrorStrategy } from './configuration-error-strategy';

export class SuppressConfigurationErrorStrategy extends ConfigurationErrorStrategy {
  handle<C>(validation: Validation<any>, type: Type<C>, config: C): void {
    // Not doing anything here...
  }
}
