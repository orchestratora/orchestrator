import { Injectable } from '@angular/core';
import { Option, OptionInteger, OptionRequired } from '@orchestrator/core';

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
