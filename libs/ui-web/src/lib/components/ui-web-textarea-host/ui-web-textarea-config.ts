import { Injectable } from '@angular/core';

import { GenericFormAttributesConfig } from '../../types';

@Injectable({ providedIn: 'root' })
export class UiWebTextAreaConfig extends GenericFormAttributesConfig {
  placeholder?: string;
  readonly?: boolean;
  cols? = 20;
  rows? = 2;
  maxlength?: number;
  minlength?: number;
  spellcheck?: boolean | 'default';
  wrap?: string;
}
