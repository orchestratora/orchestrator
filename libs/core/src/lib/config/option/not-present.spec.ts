import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionNotPresent } from './not-present';

describe('@OptionNotPresent', () => {
  it('should validate prop to not be present', () => {
    class Test {
      @OptionNotPresent() prop: string;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: null }).isRight()).toBe(true);
    expect(testType.decode({ prop: undefined }).isRight()).toBe(true);
    expect(testType.decode({}).isRight()).toBe(true);

    expect(testType.decode({ prop: 3.1 }).isLeft()).toBe(true);
    expect(testType.decode({ prop: '' }).isLeft()).toBe(true);
  });
});
