import { Injectable } from '@angular/core';
import {
  Option,
  OptionAllowedValues,
  OptionInteger,
  OptionRange,
} from '@orchestrator/core';

import { GenericFormAttributesConfig } from '../../types';

@Injectable()
export class UiWebTextAreaConfig extends GenericFormAttributesConfig {
  @Option()
  placeholder?: string;

  @Option()
  readonly?: boolean;

  @OptionRange(0, Infinity, 1)
  @OptionInteger()
  cols? = 20;

  @OptionRange(0, Infinity, 1)
  @OptionInteger()
  rows? = 2;

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
