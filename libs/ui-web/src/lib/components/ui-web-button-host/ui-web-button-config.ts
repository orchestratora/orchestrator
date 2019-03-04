import { Injectable } from '@angular/core';
import { Option, OptionInteger } from '@orchestrator/core';

@Injectable()
export class UiWebButtonConfig {
  @Option()
  text: string;

  @Option()
  type?: string;

  @Option()
  disabled?: boolean;

  @OptionInteger()
  tabindex?: number;
}
