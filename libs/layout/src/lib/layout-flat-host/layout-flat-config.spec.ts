import { TestBed } from '@angular/core/testing';
import {
  ConfigurationService,
  ErrorStrategy,
  ThrowErrorStrategy,
} from '@orchestrator/core';

import { LayoutFlatConfig } from './layout-flat-config';

describe('LayoutFlatConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ],
    });
  });

  it('should exist', () => {
    expect(LayoutFlatConfig).toBeTruthy();
  });

  describe('wrap prop', () => {
    const testWrapProp = testConfigProp('wrap');

    testWrapProp('initial');
    testWrapProp('inherit');
    testWrapProp('wrap');
    testWrapProp('nowrap');
    testWrapProp('wrap-reverse');

    it('should fail with any other value', () => {
      expect(() =>
        getConfigService().validate(LayoutFlatConfig, { wrap: 'other-value' }),
      ).toThrow();
    });
  });

  describe('direction prop', () => {
    const testDirectionProp = testConfigProp('direction');

    testDirectionProp('initial');
    testDirectionProp('inherit');
    testDirectionProp('row');
    testDirectionProp('column');

    it('should fail with any other value', () => {
      expect(() =>
        getConfigService().validate(LayoutFlatConfig, {
          direction: 'other-value',
        }),
      ).toThrow();
    });
  });

  describe('justify prop', () => {
    const testJustifyProp = testConfigProp('justify');

    testJustifyProp('initial');
    testJustifyProp('inherit');
    testJustifyProp('center');
    testJustifyProp('flex-end');
    testJustifyProp('flex-start');
    testJustifyProp('space-between');
    testJustifyProp('space-around');
    testJustifyProp('space-evenly');

    it('should fail with any other value', () => {
      expect(() =>
        getConfigService().validate(LayoutFlatConfig, {
          justify: 'other-value',
        }),
      ).toThrow();
    });
  });

  describe('alignItems prop', () => {
    const testAlignItemsProp = testConfigProp('alignItems');

    testAlignItemsProp('initial');
    testAlignItemsProp('inherit');
    testAlignItemsProp('center');
    testAlignItemsProp('flex-end');
    testAlignItemsProp('flex-start');
    testAlignItemsProp('baseline');
    testAlignItemsProp('stretch');

    it('should fail with any other value', () => {
      expect(() =>
        getConfigService().validate(LayoutFlatConfig, {
          alignItems: 'other-value',
        }),
      ).toThrow();
    });
  });

  describe('alignContent prop', () => {
    const testAlignContentProp = testConfigProp('alignContent');

    testAlignContentProp('initial');
    testAlignContentProp('inherit');
    testAlignContentProp('center');
    testAlignContentProp('flex-end');
    testAlignContentProp('flex-start');
    testAlignContentProp('space-between');
    testAlignContentProp('space-around');
    testAlignContentProp('stretch');

    it('should fail with any other value', () => {
      expect(() =>
        getConfigService().validate(LayoutFlatConfig, {
          alignContent: 'other-value',
        }),
      ).toThrow();
    });
  });
});

function testConfigProp(prop: string) {
  return (val: any) =>
    it(`should allow '${val}' value`, () => {
      expect(() =>
        getConfigService().validate(LayoutFlatConfig, { [prop]: val }),
      ).not.toThrow();
    });
}

function getConfigService(): ConfigurationService {
  return TestBed.inject(ConfigurationService);
}
