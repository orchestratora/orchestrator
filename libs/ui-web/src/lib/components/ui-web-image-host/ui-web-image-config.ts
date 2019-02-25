import { Injectable } from '@angular/core';

@Injectable()
export class UiWebImageConfig {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}
