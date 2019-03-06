import {
  classToType,
  Option,
  OptionNotPresent,
  OptionRequired,
  OptionTypeFactory,
} from '@orchestrator/core';
import { array, string, union } from 'io-ts';

export class UiWebSelectOptionPair {
  @OptionRequired()
  label: string;

  @Option()
  value?: any;

  @Option()
  disabled?: boolean;

  @Option()
  selected?: boolean;

  @OptionNotPresent()
  children?: null | undefined;
}

export const UiWebSelectOptionPairType = classToType(UiWebSelectOptionPair);

export class UiWebSelectOptionGroup {
  @OptionRequired()
  @OptionTypeFactory(() => array(union([string, UiWebSelectOptionPairType])))
  children: (string | UiWebSelectOptionPair)[];

  @Option()
  label?: string;

  @Option()
  disabled?: boolean;
}

export const UiWebSelectOptionGroupType = classToType(UiWebSelectOptionGroup);

export type UiWebSelectOption =
  | string
  | UiWebSelectOptionPair
  | UiWebSelectOptionGroup;
