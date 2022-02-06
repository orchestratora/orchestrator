import { Injectable } from '@angular/core';
import {
  Option,
  OptionAllowedValues,
  OptionInteger,
  OptionRange,
} from '@orchestrator/core';

import { FormAttributesConfig } from '../../form-attributes-config';

@Injectable()
export class UiWebTextAreaConfig extends FormAttributesConfig {
  @Option()
  placeholder?: string;

  @Option()
  readonly?: boolean;

  @OptionRange(0, Infinity, 1)
  @OptionInteger()
  cols?: number;

  @OptionRange(0, Infinity, 1)
  @OptionInteger()
  rows?: number;

  @OptionRange(0, Infinity, 1)
  @OptionInteger()
  maxlength?: number;

  @OptionRange(0, Infinity, 1)
  @OptionInteger()
  minlength?: number;

  @OptionAllowedValues(Boolean, 'default')
  spellcheck?: boolean | 'default';

  @Option()
  wrap?: string;
}
