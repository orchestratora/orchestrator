import { Injectable } from '@angular/core';

export enum UiWebHeadingLevel {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
}

@Injectable()
export class UiWebHeadingConfig {
  text: string;
  level?: UiWebHeadingLevel;
}
