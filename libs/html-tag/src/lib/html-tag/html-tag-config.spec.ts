import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { HtmlTagConfig } from './html-tag-config';

describe('HtmlTagConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(HtmlTagConfig).toBeTruthy();
  });

  describe('tag prop', () => {
    const { testValid, testInvalid } = testValidProp('tag');

    testValid(undefined);
    testValid(null);
    testValid('value', 'strings');

    testInvalid(123, 'numbers');
    testInvalid(true, 'booleans');
    testInvalid({}, 'objects');
  });

  describe('namespace prop', () => {
    const { testValid, testInvalid } = testValidProp('namespace');

    testValid(undefined);
    testValid(null);
    testValid('value', 'strings');

    testInvalid(123, 'numbers');
    testInvalid(true, 'booleans');
    testInvalid({}, 'objects');
  });

  describe('attributes prop', () => {
    const { testValid, testInvalid } = testValidProp('attributes');

    testValid(undefined);
    testValid(null);
    testValid(
      { attr1: 'value1', attr2: 'value2' },
      'object records of strings',
    );
    testValid({}, 'empty objects');

    testInvalid('value', 'strings');
    testInvalid(123, 'numbers');
    testInvalid(true, 'booleans');
    testInvalid([], 'arrays');
    testInvalid({ attr1: 123 }, 'object records of numbers');
    testInvalid({ attr1: true }, 'object records of booleans');
    testInvalid({ attr1: [] }, 'object records of arrays');
    testInvalid({ attr1: {} }, 'object records of objects');
  });
});

function testValidProp(prop: string) {
  const testValid = (val: unknown, name?: string) =>
    it(`should allow ${name || val}`, () => {
      expect(() =>
        getConfigService().validate(HtmlTagConfig, { [prop]: val }),
      ).not.toThrow();
    });

  const testInvalid = (val: unknown, name?: string) =>
    it(`should NOT allow ${name || val}`, () => {
      expect(() =>
        getConfigService().validate(HtmlTagConfig, { [prop]: val }),
      ).toThrow();
    });

  return { testValid, testInvalid };
}

function getConfigService(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
