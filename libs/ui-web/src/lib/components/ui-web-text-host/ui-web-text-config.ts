import { Injectable } from '@angular/core';
import { FunctionWithArg, Option, OptionFunction } from '@orchestrator/core';

export type UiWebTextFn<C> = FunctionWithArg<C, string>;

@Injectable()
export class UiWebTextConfig<C = any> {
  @Option()
  text?: string;

  @OptionFunction()
  textFn?: string | UiWebTextFn<C>;

  @Option()
  preserveFormatting?: boolean;
}
