import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';

import { OptionRange } from './range';

describe('@OptionRange', () => {
  it('should validate prop to be number', () => {
    class Test {
      @OptionRange(-Infinity, Infinity)
      prop: any;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: 1 }))).toBe(true);
    expect(isLeft(testType.decode({ prop: '' }))).toBe(true);
  });

  it('should validate prop to be in range inclusive', () => {
    class Test {
      @OptionRange(0, 5)
      prop: number;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: 0 }))).toBe(true);
    expect(isRight(testType.decode({ prop: 3 }))).toBe(true);
    expect(isRight(testType.decode({ prop: 5 }))).toBe(true);

    expect(isLeft(testType.decode({ prop: -1 }))).toBe(true);
    expect(isLeft(testType.decode({ prop: 6 }))).toBe(true);
    expect(isLeft(testType.decode({ prop: 10 }))).toBe(true);
  });
});
