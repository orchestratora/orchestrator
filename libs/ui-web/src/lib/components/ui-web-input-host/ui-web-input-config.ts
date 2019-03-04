import { Injectable } from '@angular/core';
import { Option, OptionType } from '@orchestrator/core';

import { GenericFormAttributesConfig, InputType } from '../../types';

@Injectable()
export class UiWebInputConfig extends GenericFormAttributesConfig {
  @OptionType(String)
  type?: InputType;

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
