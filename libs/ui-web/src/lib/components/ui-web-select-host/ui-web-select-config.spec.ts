import { inject, TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { FormAttributesConfig } from '../../form-attributes-config';
import {
  UiWebSelectOptionGroup,
  UiWebSelectOptionPair,
} from '../ui-web-select';
import { UiWebSelectConfig } from './ui-web-select-config';

describe('UiWebSelectConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UiWebSelectConfig,
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(UiWebSelectConfig).toBeTruthy();
  });

  it('should extend from `FormAttributesConfig`', inject(
    [UiWebSelectConfig],
    (config: UiWebSelectConfig) => {
      expect(config).toEqual(expect.any(FormAttributesConfig));
    },
  ));

  describe('size prop', () => {
    it('should allow integer', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { size: 1 }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { size: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { size: true }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { size: '123' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { size: {} }),
      ).toThrow();
    });
  });

  describe('multiple prop', () => {
    it('should allow boolean', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { multiple: false }),
      ).not.toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { multiple: true }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { multiple: 1.1 }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { multiple: [] }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { multiple: '123' }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, { multiple: {} }),
      ).toThrow();
    });
  });

  describe('options prop', () => {
    it('should fail for non array values', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: 'val',
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: 1,
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: {},
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: true,
        }),
      ).toThrow();
    });

    it('should allow any array of strings', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: ['val', 'val2'],
        }),
      ).not.toThrow();
    });

    it('should allow array of UiWebSelectOptionPair', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [
            {
              label: 'val1',
              value: 1,
              selected: true,
            } as UiWebSelectOptionPair,
            {
              label: 'val2',
              value: 'val2',
              selected: false,
            } as UiWebSelectOptionPair,
            {
              label: 'val3',
              value: 1,
              disabled: true,
            } as UiWebSelectOptionPair,
            {
              label: 'val1',
              value: 1,
              disabled: false,
            } as UiWebSelectOptionPair,
            {
              label: 'val1',
              value: 1,
              selected: false,
              disabled: false,
            } as UiWebSelectOptionPair,
          ],
        }),
      ).not.toThrow();
    });

    it('should allow array of UiWebSelectOptionGroup', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [
            {
              label: 'val1',
              children: [
                'val1.1',
                {
                  label: 'val1.2',
                  value: 'val1.2',
                  selected: false,
                },
              ],
              disabled: false,
            } as UiWebSelectOptionGroup,
            {
              label: 'val2',
              children: [
                'val2.1',
                {
                  label: 'val2.2',
                  value: 'val2.2',
                  selected: true,
                },
              ],
              disabled: true,
            } as UiWebSelectOptionGroup,
          ],
        }),
      ).not.toThrow();
    });

    it('should allow array of combined values of strings, UiWebSelectOptionPair, UiWebSelectOptionGroup', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [
            'val1',
            {
              label: 'val1',
              value: 1,
              selected: false,
              disabled: false,
            } as UiWebSelectOptionPair,
            {
              label: 'val1',
              children: [
                'val1.1',
                {
                  label: 'val1.2',
                  value: 'val1.2',
                  selected: false,
                },
              ],
              disabled: false,
            } as UiWebSelectOptionGroup,
          ],
        }),
      ).not.toThrow();
    });

    it('should fail for any other value', () => {
      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [1],
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [true],
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [{}],
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [{ someProp: true }],
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [
            {
              label: 'val1',
              children: [1] as any,
              disabled: false,
            } as UiWebSelectOptionGroup,
          ],
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [
            {
              label: 'val1',
              children: [{}] as any,
              disabled: false,
            } as UiWebSelectOptionGroup,
          ],
        }),
      ).toThrow();

      expect(() =>
        getConfigSvc().validate(UiWebSelectConfig, {
          options: [[]],
        }),
      ).toThrow();
    });
  });
});

function getConfigSvc(): ConfigurationService {
  return TestBed.get(ConfigurationService);
}
