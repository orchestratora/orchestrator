import { genIoType } from '@orchestrator/gen-io-ts';
import { isRight, Right } from 'fp-ts/lib/Either';

import { FunctionMeta, OptionFunction } from './function';

describe('@OptionFunction', () => {
  describe('real function', () => {
    it('should use passed in function', () => {
      const fn = decodeFn(() => 'ok');
      expect(fn()).toBe('ok');
    });
  });

  describe('function meta', () => {
    it('should create function', () => {
      const fn = decodeFn({ args: ['a', 'b = 2'], body: 'return [a, b]' });
      expect(fn()).toEqual([undefined, 2]);
      expect(fn(1)).toEqual([1, 2]);
      expect(fn(1, 3)).toEqual([1, 3]);
    });
  });

  describe('serialized', () => {
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

      it('should apply default values for arguments', () => {
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
});

class Test {
  @OptionFunction() fn: Function;
}

const testType = genIoType(Test);

function decodeFn(fn: Function | FunctionMeta | string) {
  const res = testType.decode({ fn });

  expect(isRight(res)).toBeTruthy();

  const testObj = (res as Right<Test>).right;
  expect(testObj.fn).toEqual(expect.any(Function));

  return testObj.fn;
}
