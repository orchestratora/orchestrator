import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';

import { OptionRequired } from './required';

describe('@OptionRequired', () => {
  it('should make prop required', () => {
    class Test {
      @OptionRequired() prop: string;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: '' }))).toBe(true);
    expect(isLeft(testType.decode({}))).toBe(true);
  });
});
