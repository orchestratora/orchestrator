import { Injector } from '@angular/core';
import { createLocalInjector } from './local-injector';
import * as localInjectorMap from './local-injector-map';

describe('createLocalInjector()', () => {
  describe('get() method', () => {
    it('should create injector from `getLocalProviders()`', () => {
      const getLocalProviders = jest
        .spyOn(localInjectorMap, 'getLocalProviders')
        .mockReturnValue([]);

      const parentGet = jest.fn();
      const localInjector = createLocalInjector({
        parentInjector: { get: parentGet },
        getComponent: 'getComponent' as any,
        getConfig: 'getConfig' as any,
        updateConfig: 'updateConfig' as any,
        isConfigValid: 'isConfigValid' as any,
        getContext: 'getContext' as any,
      });

      expect(getLocalProviders).toHaveBeenCalledWith(
        expect.objectContaining({
          getInjector: expect.any(Function),
          getComponent: 'getComponent',
          getConfig: 'getConfig',
          updateConfig: 'updateConfig',
          isConfigValid: 'isConfigValid',
          getContext: 'getContext',
        }),
      );

      const { getInjector } = getLocalProviders.mock.calls[0][0];

      expect(getInjector).toEqual(expect.any(Function));
      expect(getInjector()).toBe(localInjector);

      // tslint:disable-next-line: deprecation
      localInjector.get('something');

      expect(parentGet).toHaveBeenCalledWith(
        'something',
        Injector.THROW_IF_NOT_FOUND,
      );
    });
  });
});
