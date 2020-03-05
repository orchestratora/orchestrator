import { Injectable } from '@angular/core';
import { OptionRange, OptionRequired } from '@orchestrator/core';

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
  @OptionRequired()
  text: string;

  @OptionRange(1, 6, 1)
  level?: UiWebHeadingLevel;
}
