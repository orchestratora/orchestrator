import { Injectable } from '@angular/core';

import { GenericFormAttributesConfig } from '../../types';

export interface UiWebSelectOptionGroup {
  children: (string | UiWebSelectOptionPair)[];
  label?: string;
  disabled?: boolean;
}

export interface UiWebSelectOptionPair {
  label: string;
  value: any;
  disabled?: boolean;
  selected?: boolean;
}

export type UiWebSelectOption = string | UiWebSelectOptionPair | UiWebSelectOptionGroup;

@Injectable({ providedIn: 'root' })
export class UiWebSelectConfig extends GenericFormAttributesConfig {
  options: UiWebSelectOption[];
  multiple?: boolean;
  size?: number;
}
