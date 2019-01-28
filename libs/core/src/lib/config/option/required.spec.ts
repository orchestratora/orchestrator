import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionRequired } from './required';

describe('@OptionRequired', () => {
  it('should make prop required', () => {
    class Test {
      @OptionRequired() prop: string;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: '' }).isRight()).toBe(true);
    expect(testType.decode({}).isLeft()).toBe(true);
  });
});
