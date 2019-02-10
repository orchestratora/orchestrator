import { InjectionToken, ValueProvider } from '@angular/core';

import {
  getLocalProviders,
  LOCAL_GET_COMPONENT,
  LOCAL_GET_CONFIG,
  LOCAL_GET_CONFIG_VALID,
  LOCAL_GET_INJECTOR,
  LOCAL_UPDATE_CONFIG,
} from './local-injector-map';

describe('getLocalProviders()', () => {
  testProviderInjector(LOCAL_GET_INJECTOR, 'getInjector');
  testProviderInjector(LOCAL_GET_COMPONENT, 'getComponent');
  testProviderInjector(LOCAL_GET_CONFIG, 'getConfig');
  testProviderInjector(LOCAL_UPDATE_CONFIG, 'updateConfig');
  testProviderInjector(LOCAL_GET_CONFIG_VALID, 'isConfigValid');

  function testProviderInjector(token: InjectionToken<any>, key: string) {
    it(`should provide \`${token.toString()}\` from \`data.${key}\``, () => {
      const providers = getLocalProviders({
        [key]: `${key}Token`,
      } as any) as ValueProvider[];

      const injector = providers.find(p => p.provide === token);

      expect(injector).toBeTruthy();

      expect(injector.useValue).toBe(`${key}Token`);
    });
  }
});
