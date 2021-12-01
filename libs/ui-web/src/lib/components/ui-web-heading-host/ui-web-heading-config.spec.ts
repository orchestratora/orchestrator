import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';
import { UiWebHeadingConfig } from './ui-web-heading-config';

describe('UiWebHeadingConfig', () => {
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
    expect(UiWebHeadingConfig).toBeTruthy();
  });

  describe('text prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, { text: 'value' }),
      ).not.toThrow();
    });

    it('should fail if not set', () => {
      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, { text: undefined }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, { text: null }),
      ).toThrow();
    });

    it('should fail if NOT s string value', () => {
      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, { text: 1 }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, { text: true }),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, { text: {} }),
      ).toThrow();
    });
  });

  describe('level prop', () => {
    const setLvlConfig = (level: any) => ({ level, text: '' });

    it('should allow integer value between 1..6', () => {
      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(1)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(2)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(3)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(4)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(5)),
      ).not.toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(6)),
      ).not.toThrow();
    });

    it('should fail for other values', () => {
      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(0)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig(7)),
      ).toThrow();

      expect(() =>
        getConfigService().validate(UiWebHeadingConfig, setLvlConfig('value')),
      ).toThrow();
    });
  });
});

function getConfigService(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
