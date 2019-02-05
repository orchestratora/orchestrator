import { Injectable } from '@angular/core';
import { OptionFunction } from '@orchestrator/core';

@Injectable()
export class UiWebButtonConfig {
  text: string;
  type?: string;
  disabled?: boolean;
  tabindex?: number;
  @OptionFunction() click?: (e: Event) => void = () => {};
}
