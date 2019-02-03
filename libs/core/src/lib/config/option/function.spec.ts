import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionFunction } from './function';

describe('@OptionFunction', () => {
  describe('real function', () => {
    it('should use passed in function', () => {
      const fn = decodeFn(() => 'ok');
      expect(fn()).toBe('ok');
    });
  });

  describe('normal function', () => {
    it('should decode anonymous serialized function', () => {
      const fn = decodeFn('function () {return "ok"}');
      expect(fn()).toBe('ok');
    });

    it('should decode named function', () => {
      const fn = decodeFn('function name() {return "ok"}');
      expect(fn(1, 2)).toBe('ok');
    });

    it('should decode function arguments', () => {
      const fn = decodeFn('function (a, b) {return [a, b]}');
      expect(fn(1, 2)).toEqual([1, 2]);
    });

    // TODO(alex): This hangs test runner, however works elsewhere...
    xit('should apply default values for arguments', () => {
      const fn = decodeFn('function (a = 1, b = 2) {return [a, b]}');
      expect(fn()).toEqual([1, 2]);
      expect(fn(3)).toEqual([3, 2]);
      expect(fn(3, 4)).toEqual([3, 4]);
    });
  });

  describe('arrow function', () => {
    it('should decode serialized function', () => {
      const fn = decodeFn('() => {return "ok"}');
      expect(fn()).toBe('ok');
    });

    it('should decode function arguments', () => {
      const fn = decodeFn('(a, b) => {return [a, b]}');
      expect(fn(1, 2)).toEqual([1, 2]);
    });
  });

  describe('short arrow function', () => {
    it('should decode serialized function', () => {
      const fn = decodeFn('() => "ok"');
      expect(fn()).toBe('ok');
    });

    it('should decode function arguments', () => {
      const fn = decodeFn('(a, b) => [a, b]');
      expect(fn(1, 2)).toEqual([1, 2]);
    });
  });
});

function decodeFn(fn: Function | string) {
  class Test {
    @OptionFunction() fn: Function;
  }

  const testType = genIoType(Test);

  const res = testType.decode({ fn });

  expect(res.isRight()).toBeTruthy();

  const testObj = res.value as Test;
  expect(testObj.fn).toEqual(expect.any(Function));

  return testObj.fn;
}
