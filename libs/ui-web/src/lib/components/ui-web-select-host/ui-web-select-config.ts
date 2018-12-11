import { Injectable } from '@angular/core';

import { GenericFormAttributesConfig } from '../../types';
import { UiWebSelectOption } from '../ui-web-select';

@Injectable()
export class UiWebSelectConfig extends GenericFormAttributesConfig {
  options: UiWebSelectOption[];
  multiple?: boolean;
  size?: number;
}
