import { InjectFlags, ValueProvider } from '@angular/core';

import { getStaticProviders, STATIC_INJECT_FLAGS } from './static-injector-map';

describe('getStaticProviders()', () => {
  it('should provide `STATIC_INJECT_FLAGS` as value `InjectFlags`', () => {
    const providers = getStaticProviders() as ValueProvider[];

    expect(providers).toEqual(
      expect.arrayContaining([
        { provide: STATIC_INJECT_FLAGS, useValue: InjectFlags },
      ]),
    );
  });
});
