import { Injector } from '@angular/core';

import {
  getLocalProviders,
  LocalGetComponentToken,
  LocalGetConfigToken,
  LocalGetContextToken,
  LocalIsConfigValidToken,
  LocalUpdateConfigToken,
} from './local-injector-map';

/**
 * @internal
 */
export interface LocalInjectorParams {
  parentInjector: Injector;
  getComponent: LocalGetComponentToken;
  getConfig: LocalGetConfigToken;
  updateConfig: LocalUpdateConfigToken;
  isConfigValid: LocalIsConfigValidToken;
  getContext: LocalGetContextToken;
}

/**
 * @internal
 */
export function createLocalInjector(params: LocalInjectorParams): Injector {
  const injector = Injector.create({
    providers: getLocalProviders({
      ...params,
      getInjector: () => injector,
    }),
    parent: params.parentInjector,
  });

  return injector;
}
