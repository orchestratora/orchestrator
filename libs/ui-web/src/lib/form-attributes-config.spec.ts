import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { FormAttributesConfig } from './form-attributes-config';

describe('FormAttributesConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should exist', () => {
    expect(FormAttributesConfig).toBeTruthy();
  });

  describe('name prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { name: 'value' }),
      ).not.toThrow();
    });

    it('should fail if NOT s string value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { name: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { name: true }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { name: {} }),
      ).toThrow();
    });
  });

  describe('value prop', () => {
    it('should allow any value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { value: 'value' }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { value: 1 }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { value: {} }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { value: null }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { value: undefined }),
      ).not.toThrow();
    });
  });

  describe('tabindex prop', () => {
    it('should allow integer value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { tabindex: 1 }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { tabindex: -1 }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { tabindex: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { tabindex: true }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { tabindex: {} }),
      ).toThrow();
    });
  });

  describe('disabled prop', () => {
    it('should allow boolean value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { disabled: true }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { disabled: false }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { disabled: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { disabled: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { disabled: {} }),
      ).toThrow();
    });
  });

  describe('required prop', () => {
    it('should allow boolean value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { required: true }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { required: false }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { required: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { required: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { required: {} }),
      ).toThrow();
    });
  });

  describe('autofocus prop', () => {
    it('should allow boolean value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { autofocus: true }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { autofocus: false }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigService().validate(FormAttributesConfig, { autofocus: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { autofocus: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(FormAttributesConfig, { autofocus: {} }),
      ).toThrow();
    });
  });
});

function getConfigService(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
