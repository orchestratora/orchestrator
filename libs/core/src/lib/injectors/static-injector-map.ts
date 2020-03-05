import { InjectFlags, InjectionToken, StaticProvider } from '@angular/core';

import { InjectorMap } from '../types';

export const STATIC_INJECT_FLAGS = new InjectionToken<InjectFlags>(
  'STATIC_INJECT_FLAGS',
);

export const STATIC_INJECTOR_MAP: InjectorMap = {
  InjectFlags: STATIC_INJECT_FLAGS,
};

export function getStaticProviders(): StaticProvider[] {
  return [{ provide: STATIC_INJECT_FLAGS, useValue: InjectFlags }];
}
