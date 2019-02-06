import { Type } from '@angular/core';

export class FunctionError<C> extends Error {
  constructor(
    public config: Type<C>,
    public error: Error,
    public fnName: string,
    public fnBody: string,
    public args: any[],
  ) {
    super(
      `During function execution ${fnName} from config ${config.name}:
      ${error}

      Stack:
      ${error.stack}

      Function Body:
      ${fnBody}

      Function Arguments: [${args.join('\n')}]`,
    );
  }
}
