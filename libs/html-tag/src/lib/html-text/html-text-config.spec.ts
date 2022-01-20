import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { HtmlTextConfig } from './html-text-config';

describe('HtmlTextConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(HtmlTextConfig).toBeTruthy();
  });

  describe('text prop', () => {
    const { testValid, testInvalid } = testValidProp('text');

    testValid(undefined);
    testValid(null);
    testValid('value', 'strings');

    testInvalid(123, 'numbers');
    testInvalid(true, 'booleans');
    testInvalid({}, 'objects');
  });
});

function testValidProp(prop: string) {
  const testValid = (val: unknown, name?: string) =>
    it(`should allow ${name || val}`, () => {
      expect(() =>
        getConfigService().validate(HtmlTextConfig, { [prop]: val }),
      ).not.toThrow();
    });

  const testInvalid = (val: unknown, name?: string) =>
    it(`should NOT allow ${name || val}`, () => {
      expect(() =>
        getConfigService().validate(HtmlTextConfig, { [prop]: val }),
      ).toThrow();
    });

  return { testValid, testInvalid };
}

function getConfigService(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
