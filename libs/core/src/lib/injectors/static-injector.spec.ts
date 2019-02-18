import { createStaticInjector, STATIC_INJECT_FLAGS } from './static-injector';
import { InjectFlags } from '@angular/core';

describe('getStaticInjector()', () => {
  it('should return Injector', () => {
    const injector = createStaticInjector({} as any);

    expect(injector.get).toEqual(expect.any(Function));
  });

  it('should set parent injector from argument', () => {
    const parentInjector = {} as any;

    const injector = createStaticInjector(parentInjector);

    expect((injector as any).parent).toBe(parentInjector);
  });

  it('should provide `STATIC_INJECT_FLAGS` with value `InjectFlags`', () => {
    const staticInjector = createStaticInjector({} as any);

    const injectFlags = staticInjector.get(STATIC_INJECT_FLAGS);

    expect(injectFlags).toBe(InjectFlags);
  });
});
