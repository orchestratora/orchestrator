import { ErrorStrategy } from './error-strategy';

export class SuppressErrorStrategy extends ErrorStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(error: Error): void {
    // Not doing anything here...
  }
}
