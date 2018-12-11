import { Injectable } from '@angular/core';

@Injectable()
export class UiWebImageConfig {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}
