import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiWebLabelConfig {
  text: string;
  preserveFormatting?: boolean;
}
