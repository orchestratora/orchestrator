import { ThrowErrorStrategy } from './throw-error-strategy';

describe('ThrowErrorStrategy', () => {
  describe('handle() method', () => {
    it('should throw all errors', () => {
      const throwStrategy = new ThrowErrorStrategy();

      expect(() => throwStrategy.handle(new Error('error'))).toThrowError(
        'error',
      );
    });
  });
});
