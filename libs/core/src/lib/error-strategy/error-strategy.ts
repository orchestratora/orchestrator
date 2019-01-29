export abstract class ErrorStrategy {
  abstract handle(error: Error): void;
}
