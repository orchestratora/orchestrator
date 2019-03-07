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
    const setTextConfig = (text: any) => ({ text });

    it('should allow any string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTextConfig('text')),
      ).not.toThrow();
    });

    it('should fail if not set', () => {
      expect(() =>
        getConfigService().validate(
          UiWebButtonConfig,
          setTextConfig(undefined),
        ),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTextConfig(null)),
      ).toThrow();
    });

    it('should fail if NOT a string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTextConfig(1)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTextConfig(true)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTextConfig({})),
      ).toThrow();
    });
  });

  describe('type prop', () => {
    const setTypeConfig = (type: any) => ({ type, text: '' });

    it('should allow any string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTypeConfig('type')),
      ).not.toThrow();
    });

    it('should fail if NOT a string value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTypeConfig(0)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTypeConfig(true)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTypeConfig({})),
      ).toThrow();
    });
  });

  describe('disabled prop', () => {
    const setDisabledConfig = (disabled: any) => ({ disabled, text: '' });

    it('should allow boolean value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setDisabledConfig(true)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(
          UiWebButtonConfig,
          setDisabledConfig(false),
        ),
      ).not.toThrow();
    });

    it('should fail if NOT a boolean value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setDisabledConfig(1)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(
          UiWebButtonConfig,
          setDisabledConfig('value'),
        ),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setDisabledConfig({})),
      ).toThrow();
    });
  });

  describe('tabindex prop', () => {
    const setTabindexConfig = (tabindex: any) => ({ tabindex, text: '' });

    it('should allow any integer value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTabindexConfig(0)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTabindexConfig(-1)),
      ).not.toThrow();
    });

    it('should fail if NOT a integer value', () => {
      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTabindexConfig(1.1)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(
          UiWebButtonConfig,
          setTabindexConfig('value'),
        ),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebButtonConfig, setTabindexConfig({})),
      ).toThrow();
    });
  });
});

function getConfigService(): ConfigurationService {
  return TestBed.get(ConfigurationService);
}
