import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionInteger } from './integer';

describe('@OptionInteger', () => {
  it('should validate prop to be integer', () => {
    class Test {
      @OptionInteger() prop: string;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: 1 }).isRight()).toBe(true);
    expect(testType.decode({ prop: -1 }).isRight()).toBe(true);

    expect(testType.decode({ prop: 3.1 }).isLeft()).toBe(true);
    expect(testType.decode({ prop: '' }).isLeft()).toBe(true);
  });
});
