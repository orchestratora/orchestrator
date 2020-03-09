import { inject, TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { FormAttributesConfig } from '../../form-attributes-config';
import { UiWebInputConfig } from './ui-web-input-config';

describe('UiWebInputConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UiWebInputConfig,
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(UiWebInputConfig).toBeTruthy();
  });

  it('should extend from `FormAttributesConfig`', inject(
    [UiWebInputConfig],
    (config: UiWebInputConfig) => {
      expect(config).toEqual(expect.any(FormAttributesConfig));
    },
  ));

  describe('type prop', () => {
    it('should allow any string value', () => {
      validConfig({ type: 'type' });
    });

    it('should fail for any other value', () => {
      invalidConfig({ type: 1 });
      invalidConfig({ type: true });
      invalidConfig({ type: {} });
    });
  });

  describe('id prop', () => {
    it('should allow any string value', () => {
      validConfig({ id: 'id' });
    });

    it('should fail for any other value', () => {
      invalidConfig({ id: 1 });
      invalidConfig({ id: true });
      invalidConfig({ id: {} });
    });
  });

  describe('label prop', () => {
    it('should allow any string value', () => {
      validConfig({ label: 'label' });
    });

    it('should fail for any other value', () => {
      invalidConfig({ label: 1 });
      invalidConfig({ label: true });
      invalidConfig({ label: {} });
    });
  });

  describe('placeholder prop', () => {
    it('should allow any string value', () => {
      validConfig({ placeholder: 'placeholder' });
    });

    it('should fail for any other value', () => {
      invalidConfig({ placeholder: 1 });
      invalidConfig({ placeholder: true });
      invalidConfig({ placeholder: {} });
    });
  });

  describe('readonly prop', () => {
    it('should allow any boolean value', () => {
      validConfig({ readonly: true });
      validConfig({ readonly: false });
    });

    it('should fail for any other value', () => {
      invalidConfig({ readonly: 1 });
      invalidConfig({ readonly: 'value' });
      invalidConfig({ readonly: {} });
    });
  });

  describe('autocomplete prop', () => {
    it('should allow any string value', () => {
      validConfig({ autocomplete: 'value' });
    });

    it('should fail for any other value', () => {
      invalidConfig({ autocomplete: 1 });
      invalidConfig({ autocomplete: true });
      invalidConfig({ autocomplete: {} });
    });
  });
});

function validConfig(config: any) {
  expect(() => getConfigSvc().validate(UiWebInputConfig, config)).not.toThrow();
}

function invalidConfig(config: any) {
  expect(() => getConfigSvc().validate(UiWebInputConfig, config)).toThrow();
}

function getConfigSvc(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
