import { Option, OptionInteger } from '@orchestrator/core';

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
export class FormAttributesConfig {
  @Option()
  name?: string;

  value?: any;

  @OptionInteger()
  tabindex?: number;

  @Option()
  disabled?: boolean;

  @Option()
  required?: boolean;

  @Option()
  autofocus?: boolean;
}
