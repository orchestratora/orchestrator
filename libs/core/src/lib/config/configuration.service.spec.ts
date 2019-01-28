import { TestBed } from '@angular/core/testing';
import { Property } from '@orchestrator/gen-io-ts';
import { left, right } from 'fp-ts/lib/Either';
import { failure, string, success, Type } from 'io-ts';

import * as configuration from '../metadata/configuration';
import { ConfigurationErrorStrategy } from './configuration-error-strategy';
import { ConfigurationService } from './configuration.service';
import { Option, OptionInteger, OptionRequired } from './option';

class MockConfigurationErrorStrategy extends ConfigurationErrorStrategy {
  handle = jest.fn();
}

describe('Service: Configuration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        {
          provide: ConfigurationErrorStrategy,
          useClass: MockConfigurationErrorStrategy,
        },
      ],
    });
  });

  describe('validate() method', () => {
    it('should return `left([])` when no type provided', () => {
      const res = getService().validate(null, {});

      expect(res).toEqual(left([]));
    });

    it('should return `right(config)` for correct config', () => {
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: null };
      const res = getService().validate(Test, config);

      expect(res).toEqual(right(config));
    });

    it('should NOT call `ConfigurationErrorStrategy.handle()` when config correct', () => {
      const errorStrategy = getErrorStrategy();
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: null };
      getService().validate(Test, config);

      expect(errorStrategy.handle).not.toHaveBeenCalled();
    });

    it('should return `left(Validation)` for incorrect config', () => {
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: 'not ok!' };
      const res = getService().validate(Test, config as any);

      expect(res).toEqual(left(expect.any(Array)));
    });

    it('should call `ConfigurationErrorStrategy.handle(Validation, type, config)` when incorrect config', () => {
      const errorStrategy = getErrorStrategy();
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: 'not ok!' };
      const res = getService().validate(Test, config as any);

      expect(errorStrategy.handle).toHaveBeenCalledWith(res, Test, config);
    });
  });

  describe('decode() method', () => {
    it('should return `config` when no type provided', () => {
      const config = { config: true };
      const res = getService().decode(null, config);

      expect(res).toEqual(config);
    });

    it('should return `decodedConfig` when valid', () => {
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: null };
      const res = getService().decode(Test, config);

      expect(res).toEqual(config);
    });

    it('should return decoded `config` when valid', () => {
      const FnFromString = new Type<Function, string>(
        'FnFromString',
        (fn): fn is Function => typeof fn === 'function',
        (m, c) =>
          string.validate(m, c).chain(s => {
            try {
              return success(new Function(s));
            } catch {
              return failure(s, c);
            }
          }),
        a => a.toString(),
      );

      class Test {
        @Property({ typeFactory: () => FnFromString })
        prop1: Function;
      }

      const config = { prop1: 'return "hi from prop1"' };
      const res = getService().decode(Test, config as any);

      expect(res).toEqual({
        prop1: expect.any(Function),
      });

      expect(res.prop1()).toBe('hi from prop1');
    });

    it('should return `config` when invalid', () => {
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: 'not ok' };
      const res = getService().decode(Test, config as any);

      expect(res).toEqual(config);
    });
  });

  describe('getMetaOf() method', () => {
    it('should return `getConfigs(type)`', () => {
      const getConfigs = spyOn(configuration, 'getConfigs').and.returnValue(
        'configs',
      );

      class Test {
        @OptionRequired()
        @OptionInteger()
        prop1: number;
      }

      const res = getService().getMetaOf(Test);

      expect(getConfigs).toHaveBeenCalledWith(Test);
      expect(res).toBe('configs');
    });
  });
});

function getService(): ConfigurationService {
  return TestBed.get(ConfigurationService);
}

function getErrorStrategy(): MockConfigurationErrorStrategy {
  return TestBed.get(ConfigurationErrorStrategy);
}
