import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionType } from './type';

describe('@OptionType', () => {
  it('should validate prop type', () => {
    class Test {
      @OptionType(Boolean) prop: string;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: true }).isRight()).toBe(true);
    expect(testType.decode({ prop: '' }).isLeft()).toBe(true);
  });
});
