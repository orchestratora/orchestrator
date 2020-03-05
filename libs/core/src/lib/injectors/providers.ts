import { Provider } from '@angular/core';

import { LOCAL_INJECTOR_MAP } from './local-injector-map';
import { provideInjectorMap } from './mapped-injector';
import { getStaticProviders, STATIC_INJECTOR_MAP } from './static-injector-map';

/**
 * Provides a map for injectors with providers
 *
 * @internal
 */
export const INJECTOR_MAP_PROVIDERS: Provider[] = [
  ...getStaticProviders(),
  provideInjectorMap(STATIC_INJECTOR_MAP),
  provideInjectorMap(LOCAL_INJECTOR_MAP),
];
