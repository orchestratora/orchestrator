import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiWebImageConfig {
  src: string;
  width?: number;
  heigh?: number;
  alt?: string;
}
