import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionRange } from './range';

describe('@OptionRange', () => {
  it('should validate prop to be number', () => {
    class Test {
      @OptionRange(-Infinity, Infinity)
      prop: any;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: 1 }).isRight()).toBe(true);
    expect(testType.decode({ prop: '' }).isLeft()).toBe(true);
  });

  it('should validate prop to be in range inclusive', () => {
    class Test {
      @OptionRange(0, 5)
      prop: number;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: 0 }).isRight()).toBe(true);
    expect(testType.decode({ prop: 3 }).isRight()).toBe(true);
    expect(testType.decode({ prop: 5 }).isRight()).toBe(true);

    expect(testType.decode({ prop: -1 }).isLeft()).toBe(true);
    expect(testType.decode({ prop: 6 }).isLeft()).toBe(true);
    expect(testType.decode({ prop: 10 }).isLeft()).toBe(true);
  });
});
