import { inject, TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { FormAttributesConfig } from '../../form-attributes-config';
import { UiWebTextAreaConfig } from './ui-web-textarea-config';

describe('UiWebTextAreaConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UiWebTextAreaConfig,
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(UiWebTextAreaConfig).toBeTruthy();
  });

  it('should extend from `FormAttributesConfig`', inject(
    [UiWebTextAreaConfig],
    (config: UiWebTextAreaConfig) => {
      expect(config).toEqual(expect.any(FormAttributesConfig));
    },
  ));

  it('should set `cols` to `20`', () => {
    expect(getConfig().cols).toBe(20);
  });

  it('should set `rows` to `2`', () => {
    expect(getConfig().rows).toBe(2);
  });

  describe('placeholder prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { placeholder: 'val' }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { placeholder: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { placeholder: true }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { placeholder: {} }),
      ).toThrow();
    });
  });

  describe('readonly prop', () => {
    it('should allow any boolean value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { readonly: true }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { readonly: false }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { readonly: 1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { readonly: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { readonly: {} }),
      ).toThrow();
    });
  });

  describe('cols prop', () => {
    it('should allow positive integer value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { cols: 1 }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { cols: 0 }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { cols: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { cols: -1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { cols: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { cols: {} }),
      ).toThrow();
    });
  });

  describe('rows prop', () => {
    it('should allow positive integer value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { rows: 1 }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { rows: 0 }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { rows: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { rows: -1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { rows: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { rows: {} }),
      ).toThrow();
    });
  });

  describe('maxlength prop', () => {
    it('should allow positive integer value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { maxlength: 1 }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { maxlength: 0 }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { maxlength: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { maxlength: -1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { maxlength: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { maxlength: {} }),
      ).toThrow();
    });
  });

  describe('minlength prop', () => {
    it('should allow positive integer value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { minlength: 1 }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { minlength: 0 }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { minlength: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { minlength: -1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { minlength: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { minlength: {} }),
      ).toThrow();
    });
  });

  describe('spellcheck prop', () => {
    it('should allow boolean value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { spellcheck: true }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { spellcheck: false }),
      ).not.toThrow();
    });

    it('should allow `default` value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { spellcheck: 'default' }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { spellcheck: 1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { spellcheck: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { spellcheck: {} }),
      ).toThrow();
    });
  });

  describe('wrap prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { wrap: 'val' }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { wrap: 1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { wrap: true }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextAreaConfig, { wrap: {} }),
      ).toThrow();
    });
  });
});

function getConfig(): UiWebTextAreaConfig {
  return TestBed.inject(UiWebTextAreaConfig);
}

function getConfigSvc(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
