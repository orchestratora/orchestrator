import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { Int } from 'io-ts';

import { OptionTypeFactory } from './type-factory';

describe('@OptionTypeFactory', () => {
  it('should make prop required', () => {
    class Test {
      @OptionTypeFactory(() => Int) prop: string;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: 1 }))).toBe(true);

    expect(isLeft(testType.decode({ prop: '1' }))).toBe(true);
    expect(isLeft(testType.decode({ prop: 1.1 }))).toBe(true);
  });
});
