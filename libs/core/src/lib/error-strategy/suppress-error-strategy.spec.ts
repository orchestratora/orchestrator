import { SuppressErrorStrategy } from './suppress-error-strategy';

describe('SuppressErrorStrategy', () => {
  describe('handle() method', () => {
    it('should suppress all errors', () => {
      const suppressStrategy = new SuppressErrorStrategy();

      expect(() => suppressStrategy.handle(new Error('error'))).not.toThrow();
    });
  });
});
