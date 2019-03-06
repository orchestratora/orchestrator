import { Injectable } from '@angular/core';
import { Option, OptionType } from '@orchestrator/core';

import { FormAttributesConfig } from '../../form-attributes-config';

@Injectable()
export class UiWebInputConfig extends FormAttributesConfig {
  @OptionType(String)
  type?: string;

  @Option()
  id?: string;

  @Option()
  label?: string;

  @Option()
  placeholder?: string;

  @Option()
  readonly?: boolean;

  @Option()
  autocomplete?: string;
}
