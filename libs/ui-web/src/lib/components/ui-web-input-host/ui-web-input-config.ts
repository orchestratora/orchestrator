import { Injectable } from '@angular/core';

import { GenericFormAttributesConfig, InputType } from '../../types';

@Injectable({ providedIn: 'root' })
export class UiWebInputConfig extends GenericFormAttributesConfig {
  type?: InputType;
  id?: string;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
}
