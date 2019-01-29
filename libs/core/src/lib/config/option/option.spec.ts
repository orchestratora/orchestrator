import { genIoType } from '@orchestrator/gen-io-ts';
import * as genIoTs from '@orchestrator/gen-io-ts';

import { Option } from './option';
import * as required from './required';
import * as type from './type';
import * as range from './range';
import * as integer from './integer';
import * as allowedValues from './allowed-values';

describe('@Option', () => {
  it('should call `Property`', () => {
    const property = spyOn(genIoTs, 'Property').and.callThrough();

    class Test {
      @Option() prop: string;
    }

    genIoType(Test);

    expect(property).toHaveBeenCalled();
  });

  describe('required config', () => {
    it('should call `OptionRequired` when set to `true`', () => {
      const optionRequired = spyOn(required, 'OptionRequired');

      class Test {
        @Option({ required: true })
        prop: string;
      }

      genIoType(Test);

      expect(optionRequired).toHaveBeenCalled();
    });

    it('should NOT call `OptionRequired` if not set to `true`', () => {
      const optionRequired = spyOn(required, 'OptionRequired');

      class Test {
        @Option({ required: false })
        prop: string;
      }

      genIoType(Test);

      expect(optionRequired).not.toHaveBeenCalled();
    });
  });

  describe('type config', () => {
    it('should call `OptionType` with `config.type`', () => {
      const optionType = spyOn(type, 'OptionType');

      class Test {
        @Option({ type: 'type' })
        prop: string;
      }

      genIoType(Test);

      expect(optionType).toHaveBeenCalledWith('type');
    });
  });

  describe('range config', () => {
    it('should call `OptionRange` with `config.range.min, config.range.max, config.range.step`', () => {
      const optionRange = spyOn(range, 'OptionRange');

      class Test {
        @Option({ range: { min: 1, max: 2, step: 3 } })
        prop: string;
      }

      genIoType(Test);

      expect(optionRange).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  describe('integer config', () => {
    it('should call `OptionInteger` if set to `true`', () => {
      const optionInteger = spyOn(integer, 'OptionInteger');

      class Test {
        @Option({ integer: true })
        prop: string;
      }

      genIoType(Test);

      expect(optionInteger).toHaveBeenCalled();
    });

    it('should NOT call `OptionInteger` if not set to `true`', () => {
      const optionInteger = spyOn(integer, 'OptionInteger');

      class Test {
        @Option({ integer: false })
        prop: string;
      }

      genIoType(Test);

      expect(optionInteger).not.toHaveBeenCalled();
    });
  });

  describe('allowedValues config', () => {
    it('should call `OptionAllowedValues` with `...config.allowedValues`', () => {
      const optionAllowedValues = spyOn(allowedValues, 'OptionAllowedValues');

      class Test {
        @Option({ allowedValues: [1, 'two', true] })
        prop: string;
      }

      genIoType(Test);

      expect(optionAllowedValues).toHaveBeenCalledWith(1, 'two', true);
    });
  });

  describe('multiple configs', () => {
    it('should apply multiple non conflicting validations', () => {
      class Test {
        @Option({
          required: true,
          integer: true,
          range: { min: 0, max: Infinity },
        })
        prop: any;
      }

      const testType = genIoType(Test);

      expect(testType.decode({ prop: 0 }).isRight()).toBe(true);
      expect(testType.decode({ prop: 1 }).isRight()).toBe(true);
      expect(testType.decode({ prop: 100 }).isRight()).toBe(true);

      expect(testType.decode({ prop: -1 }).isRight()).toBe(false);
      expect(testType.decode({ prop: 1.1 }).isRight()).toBe(false);
      expect(testType.decode({ prop: '' }).isRight()).toBe(false);
      expect(testType.decode({ prop: null }).isRight()).toBe(false);
      expect(testType.decode({}).isRight()).toBe(false);
    });
  });
});
