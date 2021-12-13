import { UiWebImageConfig } from './ui-web-image-config';
import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

describe('UiWebImageConfig', () => {
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
    expect(UiWebImageConfig).toBeTruthy();
  });

  describe('src prop', () => {
    const setSrcConfig = (src: any) => ({ src });

    it('should allow any string value', () => {
      validConfig(setSrcConfig('src'));
    });

    it('should fail if not set', () => {
      invalidConfig(setSrcConfig(undefined));
      invalidConfig(setSrcConfig(null));
    });

    it('should fail for any other value', () => {
      invalidConfig(setSrcConfig(1));
      invalidConfig(setSrcConfig(true));
      invalidConfig(setSrcConfig({}));
    });
  });

  describe('width prop', () => {
    const setWidthConfig = (width: any) => ({ width, src: '' });

    it('should allow any string or number value', () => {
      validConfig(setWidthConfig('123'));
      validConfig(setWidthConfig(123));
    });

    it('should fail for any other value', () => {
      invalidConfig(setWidthConfig([]));
      invalidConfig(setWidthConfig(true));
      invalidConfig(setWidthConfig({}));
    });
  });

  describe('height prop', () => {
    const setHeightConfig = (height: any) => ({ height, src: '' });

    it('should allow any string or number value', () => {
      validConfig(setHeightConfig('123'));
      validConfig(setHeightConfig(123));
    });

    it('should fail for any other value', () => {
      invalidConfig(setHeightConfig([]));
      invalidConfig(setHeightConfig(true));
      invalidConfig(setHeightConfig({}));
    });
  });

  describe('alt prop', () => {
    const setAltConfig = (alt: any) => ({ alt, src: '' });

    it('should allow any string value', () => {
      validConfig(setAltConfig('123'));
    });

    it('should fail for any other value', () => {
      invalidConfig(setAltConfig(1));
      invalidConfig(setAltConfig(true));
      invalidConfig(setAltConfig({}));
    });
  });
});

function validConfig(config: any) {
  expect(() => getConfigSvc().validate(UiWebImageConfig, config)).not.toThrow();
}

function invalidConfig(config: any) {
  expect(() => getConfigSvc().validate(UiWebImageConfig, config)).toThrow();
}

function getConfigSvc(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
