import { Injectable } from '@angular/core';
import { InputType } from '../../types';

@Injectable({ providedIn: 'root' })
export class UiWebInputConfig {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: InputType;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  tabindex?: number;
  name: string;
}
