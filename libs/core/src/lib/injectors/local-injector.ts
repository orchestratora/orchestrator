import { Injector } from '@angular/core';

import { getLocalProviders, LocalProvidersData } from './local-injector-map';

/**
 * @internal
 */
export interface LocalInjectorParams extends LocalProvidersData {
  parentInjector: Injector;
}

/**
 * @internal
 */
export function createLocalInjector(params: LocalInjectorParams): Injector {
  return Injector.create({
    providers: getLocalProviders(params),
    parent: params.parentInjector,
  });
}
