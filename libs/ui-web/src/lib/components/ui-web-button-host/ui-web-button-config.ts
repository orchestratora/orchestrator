import { Injectable } from '@angular/core';
import { Option, OptionInteger, OptionRequired } from '@orchestrator/core';

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
@Injectable()
export class UiWebButtonConfig {
  @OptionRequired()
  text: string;

  @Option()
  type?: string;

  @Option()
  disabled?: boolean;

  @OptionInteger()
  tabindex?: number;
}
