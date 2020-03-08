import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';

import { OptionInteger } from './integer';

describe('@OptionInteger', () => {
  it('should validate prop to be integer', () => {
    class Test {
      @OptionInteger() prop: string;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: 1 }))).toBe(true);
    expect(isRight(testType.decode({ prop: -1 }))).toBe(true);

    expect(isLeft(testType.decode({ prop: 3.1 }))).toBe(true);
    expect(isLeft(testType.decode({ prop: '' }))).toBe(true);
  });
});
