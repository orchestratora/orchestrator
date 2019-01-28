import { ErrorStrategy } from './error-strategy';

export class SuppressErrorStrategy extends ErrorStrategy {
  handle(error: Error): void {
    // Not doing anything here...
  }
}
