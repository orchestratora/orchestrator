import {
  classToType,
  Option,
  OptionNotPresent,
  OptionRequired,
  OptionTypeFactory,
} from '@orchestrator/core';
import { array, string, union } from 'io-ts';

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
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

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
export const UiWebSelectOptionPairType = classToType(UiWebSelectOptionPair);

/**
 * @internal
 */
export function uiWebSelectOptionGroupFactory() {
  return array(union([string, UiWebSelectOptionPairType]));
}

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
export class UiWebSelectOptionGroup {
  @OptionRequired()
  @OptionTypeFactory(uiWebSelectOptionGroupFactory)
  children: (string | UiWebSelectOptionPair)[];

  @Option()
  label?: string;

  @Option()
  disabled?: boolean;
}

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
export const UiWebSelectOptionGroupType = classToType(UiWebSelectOptionGroup);

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
export type UiWebSelectOption =
  | string
  | UiWebSelectOptionPair
  | UiWebSelectOptionGroup;
