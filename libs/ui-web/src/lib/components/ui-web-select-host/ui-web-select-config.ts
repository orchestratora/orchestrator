import { Injectable } from '@angular/core';
import { Option, OptionInteger } from '@orchestrator/core';
import { Property } from '@orchestrator/gen-io-ts';
import { array, string, union } from 'io-ts';

import { FormAttributesConfig } from '../../form-attributes-config';
import {
  UiWebSelectOption,
  UiWebSelectOptionGroupType,
  UiWebSelectOptionPairType,
} from '../ui-web-select';

@Injectable()
export class UiWebSelectConfig extends FormAttributesConfig {
  @Property({
    typeFactory: () =>
      array(
        union([string, UiWebSelectOptionGroupType, UiWebSelectOptionPairType]),
      ),
  })
  options: UiWebSelectOption[];

  @Option()
  multiple?: boolean;

  @OptionInteger()
  size?: number;
}
