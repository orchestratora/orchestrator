import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { UiWebTextConfig } from './ui-web-text-config';

describe('UiWebTextConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(UiWebTextConfig).toBeTruthy();
  });

  describe('text prop', () => {
    it('should allow any string value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: 'text' }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: 1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: true }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: {} }),
      ).toThrow();
    });
  });

  describe('textWithCtx prop', () => {
    it('should allow function as string', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, {
          textWithCtx: '() => `text`',
        }),
      ).not.toThrow();
    });

    it('should allow function', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { textWithCtx: () => 'text' }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: 1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: true }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { text: {} }),
      ).toThrow();
    });
  });

  describe('preserveFormatting prop', () => {
    it('should allow boolean value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, {
          preserveFormatting: true,
        }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, {
          preserveFormatting: false,
        }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { preserveFormatting: 1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { preserveFormatting: 'val' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebTextConfig, { preserveFormatting: {} }),
      ).toThrow();
    });
  });
});

function getConfigSvc(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
