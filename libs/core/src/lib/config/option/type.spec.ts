import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';

import { OptionType } from './type';

describe('@OptionType', () => {
  it('should validate prop type', () => {
    class Test {
      @OptionType(Boolean) prop: string;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: true }))).toBe(true);
    expect(isLeft(testType.decode({ prop: '' }))).toBe(true);
  });
});
