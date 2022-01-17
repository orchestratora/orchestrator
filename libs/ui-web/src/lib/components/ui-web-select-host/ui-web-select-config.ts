import { Injectable } from '@angular/core';
import { Option, OptionInteger, OptionTypeFactory } from '@orchestrator/core';
import { array, string, union } from 'io-ts';

import { FormAttributesConfig } from '../../form-attributes-config';
import {
  UiWebSelectOption,
  UiWebSelectOptionGroupType,
  UiWebSelectOptionPairType,
} from '../ui-web-select';

/**
 * @internal
 */
export function uiWebSelectOptionFactory() {
  return array(
    union([string, UiWebSelectOptionGroupType, UiWebSelectOptionPairType]),
  );
}

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
@Injectable()
export class UiWebSelectConfig extends FormAttributesConfig {
  @OptionTypeFactory(uiWebSelectOptionFactory)
  options: UiWebSelectOption[];

  @Option()
  multiple?: boolean;

  @OptionInteger()
  size?: number;
}
