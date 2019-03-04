import { Injectable } from '@angular/core';
import {
  OptionAllowedValues,
  OptionRequired,
  Option,
} from '@orchestrator/core';

@Injectable()
export class UiWebImageConfig {
  @OptionRequired()
  src: string;

  @OptionAllowedValues(Number, String)
  width?: number | string;

  @OptionAllowedValues(Number, String)
  height?: number | string;

  @Option()
  alt?: string;
}
