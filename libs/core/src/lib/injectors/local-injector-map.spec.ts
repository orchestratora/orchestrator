import { InjectionToken, ValueProvider } from '@angular/core';

import {
  getLocalProviders,
  LOCAL_GET_COMPONENT,
  LOCAL_GET_CONFIGURATION,
  LOCAL_GET_CONFIGURATION_VALID,
  LOCAL_GET_INJECTOR,
} from './local-injector-map';

describe('getLocalProviders()', () => {
  testProviderInjector(LOCAL_GET_INJECTOR, 'getInjector');
  testProviderInjector(LOCAL_GET_COMPONENT, 'getComponent');
  testProviderInjector(LOCAL_GET_CONFIGURATION, 'getConfig');
  testProviderInjector(LOCAL_GET_CONFIGURATION_VALID, 'isConfigValid');

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
