import { Injectable } from '@angular/core';

@Injectable()
export class UiWebButtonConfig {
  text: string;
  type?: string;
  disabled?: boolean;
  tabindex?: number;
}
