import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Property } from '@orchestrator/gen-io-ts';
import { chain, left, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { failure, string, success, Type } from 'io-ts';

import { ErrorStrategy } from '../error-strategy/error-strategy';
import * as configuration from '../metadata/configuration';
import { ConfigurationService } from './configuration.service';
import { FunctionError } from './function-error';
import { InvalidConfigurationError } from './invalid-configuration-error';
import {
  Option,
  OptionFunction,
  OptionInteger,
  OptionRequired,
} from './option';

class MockConfigurationErrorStrategy extends ErrorStrategy {
  handle = jest.fn();
}

describe('Service: Configuration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        {
          provide: ErrorStrategy,
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

    it('should call `ConfigurationErrorStrategy.handle(new InvalidConfigurationError(Validation, type, config))` when incorrect config', () => {
      const errorStrategy = getErrorStrategy();
      class Test {
        @Option() prop1: string;
        @Option() prop2: boolean;
      }

      const config = { prop1: 'ok', prop2: 'not ok!' };
      const res = getService().validate(Test, config as any);

      const expectedError = new InvalidConfigurationError(
        Test,
        res,
        config as any,
      );

      expect(errorStrategy.handle).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('decode() method', () => {
    it('should return `config` when no type provided', () => {
      const config = { config: true };
      const res = getService().decode(null, config);

      expect(res).toEqual(config);
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

    it('should return decoded `config` when valid', () => {
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
          pipe(
            string.validate(m, c),
            chain(str => {
              try {
                return success(new Function(str));
              } catch {
                return failure(str, c);
              }
            }),
          ),
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

    it('should bind `OptionFunction` functions in config via `Injector`', () => {
      const service = getService();
      const injector = TestBed.get(Injector) as Injector;
      const injectorGet = spyOn(injector, 'get');

      class Test {
        @OptionFunction() prop1: Function;
      }

      const config = { prop1: '(arg1, arg2 = 1) => [arg1, arg2]' };
      const res = service.decode(Test, config as any);

      expect(res.prop1).toEqual(expect.any(Function));
      expect(injectorGet).toHaveBeenCalledWith(
        'arg1',
        Injector.THROW_IF_NOT_FOUND,
      );
      expect(injectorGet).toHaveBeenCalledWith('arg2', null);
      expect(res.prop1()).toEqual([undefined, 1]);

      injectorGet.and.returnValue('resolved');
      const res2 = service.decode(Test, config as any);

      expect(res2.prop1()).toEqual(['resolved', 'resolved']);
    });

    it('should bind `OptionFunction` functions in config via passed injector', () => {
      const injector = { get: jest.fn().mockReturnValue('resolved') };

      class Test {
        @OptionFunction() prop1: Function;
      }

      const config = { prop1: '(arg1, arg2 = 1) => [arg1, arg2]' };
      const res = getService().decode(Test, config as any, injector);

      expect(injector.get).toHaveBeenCalledWith(
        'arg1',
        Injector.THROW_IF_NOT_FOUND,
      );
      expect(injector.get).toHaveBeenCalledWith('arg2', null);
      expect(res.prop1).toEqual(expect.any(Function));
      expect(res.prop1()).toEqual(['resolved', 'resolved']);
    });

    it('should bind `OptionFunction` functions in config via custom injector factory', () => {
      const injector = { get: jest.fn().mockReturnValue('resolved') };

      class Test {
        @OptionFunction(() => injector)
        prop1: Function;
      }

      const config = { prop1: '(arg1, arg2 = 1) => [arg1, arg2]' };
      const res = getService().decode(Test, config as any);

      expect(injector.get).toHaveBeenCalledWith(
        'arg1',
        Injector.THROW_IF_NOT_FOUND,
      );
      expect(injector.get).toHaveBeenCalledWith('arg2', null);
      expect(res.prop1).toEqual(expect.any(Function));
      expect(res.prop1()).toEqual(['resolved', 'resolved']);
    });

    it('should not throw any errors from `OptionFunction`', () => {
      class Test {
        @OptionFunction() prop1: Function;
      }

      const config = { prop1: '() => {throw Error("reason")}' };
      const res = getService().decode(Test, config as any);

      expect(res.prop1).toEqual(expect.any(Function));
      expect(() => res.prop1()).not.toThrowError();
    });

    it('should wrap errors in `FunctionError` and pass to `ErrorStrategy`', () => {
      const injector = { get: jest.fn().mockReturnValue('resolved') };

      class Test {
        @OptionFunction() prop1: Function;
      }

      const config = { prop1: '(arg) => {throw Error("reason")}' };
      const res = getService().decode(Test, config as any, injector);

      expect(() => res.prop1()).not.toThrowError();
      expect(getErrorStrategy().handle).toHaveBeenCalled();

      const error = getErrorStrategy().handle.mock.calls[0][0] as FunctionError<
        any
      >;

      expect(error.config).toBe(Test);
      expect(error.error).toEqual(new Error('reason'));
      expect(error.fnName).toBe('prop1');
      expect(error.fnBody).toBe('(arg) => {throw Error("reason")}');
      expect(error.args).toEqual(['resolved']);
    });
  });

  describe('getMetaOf() method', () => {
    it('should return `getConfigs(type.prototype)`', () => {
      const getConfigs = spyOn(configuration, 'getConfigs').and.returnValue(
        'configs',
      );

      class Test {
        @OptionRequired()
        @OptionInteger()
        prop1: number;
      }

      const res = getService().getMetaOf(Test);

      expect(getConfigs).toHaveBeenCalledWith(Test.prototype);
      expect(res).toBe('configs');
    });
  });
});

function getService(): ConfigurationService {
  return TestBed.get(ConfigurationService);
}

function getErrorStrategy(): MockConfigurationErrorStrategy {
  return TestBed.get(ErrorStrategy);
}
