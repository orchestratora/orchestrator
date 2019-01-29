import { ErrorStrategy } from './error-strategy';

export class ThrowErrorStrategy extends ErrorStrategy {
  handle(error: Error): void {
    throw error;
  }
}
