import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiWebButtonConfig {
  text: string;
  type?: string;
  disabled?: boolean;
  tabindex?: number;
}
