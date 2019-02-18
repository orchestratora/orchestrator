import { InjectFlags, InjectionToken, Injector } from '@angular/core';

export const STATIC_INJECT_FLAGS = new InjectionToken<InjectFlags>(
  'STATIC_INJECT_FLAGS',
);

export function createStaticInjector(parent: Injector) {
  return Injector.create({
    providers: [{ provide: STATIC_INJECT_FLAGS, useValue: InjectFlags }],
    parent,
  });
}
