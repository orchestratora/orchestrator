import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { UiWebButtonConfig } from './ui-web-button-config';

describe('UiWebButtonConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(UiWebButtonConfig).toBeTruthy();
  });

  describe('text prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { text: 'text' }),
      ).not.toThrow();
    });

    it('should fail if NOT a string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { text: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { text: true }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { text: {} }),
      ).toThrow();
    });
  });

  describe('type prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { type: 'type' }),
      ).not.toThrow();
    });

    it('should fail if NOT a string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { type: 0 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { type: true }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { type: {} }),
      ).toThrow();
    });
  });

  describe('disabled prop', () => {
    it('should allow boolean value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { disabled: true }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { disabled: false }),
      ).not.toThrow();
    });

    it('should fail if NOT a boolean value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { disabled: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { disabled: 'value' }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { disabled: {} }),
      ).toThrow();
    });
  });

  describe('tabindex prop', () => {
    it('should allow any integer value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { tabindex: 0 }),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { tabindex: -1 }),
      ).not.toThrow();
    });

    it('should fail if NOT a integer value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { tabindex: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { tabindex: 'value' }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, { tabindex: {} }),
      ).toThrow();
    });
  });
});

function getConfigService(): ConfigurationService {
  return TestBed.get(ConfigurationService);
}
