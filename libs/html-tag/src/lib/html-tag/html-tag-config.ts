import { Injectable } from '@angular/core';
import { Option, OptionTypeFactory } from '@orchestrator/core';
import { record, string } from 'io-ts';

@Injectable({ providedIn: 'root' })
export class HtmlTagConfig {
  @Option()
  tag?: string;

  @Option()
  namespace?: string;

  @OptionTypeFactory(() => record(string, string))
  attributes?: { [attr: string]: string };

  @Option()
  text?: string;

  @Option()
  html?: string;
}
