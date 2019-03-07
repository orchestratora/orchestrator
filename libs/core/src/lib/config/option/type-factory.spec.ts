import { genIoType } from '@orchestrator/gen-io-ts';
import { Int } from 'io-ts';

import { OptionTypeFactory } from './type-factory';

describe('@OptionTypeFactory', () => {
  it('should make prop required', () => {
    class Test {
      @OptionTypeFactory(() => Int) prop: string;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: 1 }).isRight()).toBe(true);

    expect(testType.decode({ prop: '1' }).isLeft()).toBe(true);
    expect(testType.decode({ prop: 1.1 }).isLeft()).toBe(true);
  });
});
