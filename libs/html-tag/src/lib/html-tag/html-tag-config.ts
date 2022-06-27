import { Injectable } from '@angular/core';
import { Option, OptionTypeFactory } from '@orchestrator/core';
import { record, string, unknown } from 'io-ts';

@Injectable({ providedIn: 'root' })
export class HtmlTagConfig {
  @Option()
  tag?: string;

  @Option()
  namespace?: string;

  @OptionTypeFactory(() => record(string, string))
  attributes?: Record<string, string>;

  @OptionTypeFactory(() => record(string, unknown))
  properties?: Record<string, unknown>;

  @Option()
  text?: string;

  @Option()
  html?: string;
}
