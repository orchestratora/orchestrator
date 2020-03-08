import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';

import { OptionNotPresent } from './not-present';

describe('@OptionNotPresent', () => {
  it('should validate prop to not be present', () => {
    class Test {
      @OptionNotPresent() prop: string;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: null }))).toBe(true);
    expect(isRight(testType.decode({ prop: undefined }))).toBe(true);
    expect(isRight(testType.decode({}))).toBe(true);

    expect(isLeft(testType.decode({ prop: 3.1 }))).toBe(true);
    expect(isLeft(testType.decode({ prop: '' }))).toBe(true);
  });
});
