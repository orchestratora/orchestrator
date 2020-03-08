import { genIoType } from '@orchestrator/gen-io-ts';
import { isLeft, isRight } from 'fp-ts/lib/Either';

import { OptionAllowedValues } from './allowed-values';

describe('@OptionAllowedValues', () => {
  it('should validate prop to be one from array', () => {
    class Test {
      @OptionAllowedValues('ok', 'good', Boolean)
      prop: string;
    }

    const testType = genIoType(Test);

    expect(isRight(testType.decode({ prop: 'ok' }))).toBe(true);
    expect(isRight(testType.decode({ prop: 'good' }))).toBe(true);
    expect(isRight(testType.decode({ prop: true }))).toBe(true);
    expect(isRight(testType.decode({ prop: null }))).toBe(true);
    expect(isRight(testType.decode({}))).toBe(true);

    expect(isLeft(testType.decode({ prop: '' }))).toBe(true);
    expect(isLeft(testType.decode({ prop: 'fail?' }))).toBe(true);
    expect(isLeft(testType.decode({ prop: 1 }))).toBe(true);
    expect(isLeft(testType.decode({ prop: {} }))).toBe(true);
  });
});
