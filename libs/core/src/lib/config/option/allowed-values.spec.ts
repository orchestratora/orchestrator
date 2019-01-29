import { genIoType } from '@orchestrator/gen-io-ts';

import { OptionAllowedValues } from './allowed-values';

describe('@OptionAllowedValues', () => {
  it('should validate prop to be one from array', () => {
    class Test {
      @OptionAllowedValues('ok', 'good', Boolean)
      prop: string;
    }

    const testType = genIoType(Test);

    expect(testType.decode({ prop: 'ok' }).isRight()).toBe(true);
    expect(testType.decode({ prop: 'good' }).isRight()).toBe(true);
    expect(testType.decode({ prop: true }).isRight()).toBe(true);
    expect(testType.decode({ prop: null }).isRight()).toBe(true);
    expect(testType.decode({}).isRight()).toBe(true);

    expect(testType.decode({ prop: '' }).isLeft()).toBe(true);
    expect(testType.decode({ prop: 'fail?' }).isLeft()).toBe(true);
    expect(testType.decode({ prop: 1 }).isLeft()).toBe(true);
    expect(testType.decode({ prop: {} }).isLeft()).toBe(true);
  });
});
