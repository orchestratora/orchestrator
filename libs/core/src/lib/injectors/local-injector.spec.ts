import { createLocalInjector } from './local-injector';
import * as localInjectorMap from './local-injector-map';

describe('createLocalInjector()', () => {
  describe('get() method', () => {
    it('should create injector from `getLocalProviders()`', () => {
      const getLocalProviders = spyOn(
        localInjectorMap,
        'getLocalProviders',
      ).and.returnValue([]);

      const parentGet = jest.fn();
      const localInjector = createLocalInjector({
        parentInjector: { get: parentGet },
        getInjector: 'getInjector' as any,
        getContext: 'getContext' as any,
        getComponent: 'getComponent' as any,
        getConfig: 'getConfig' as any,
        updateConfig: 'updateConfig' as any,
        isConfigValid: 'isConfigValid' as any,
      });

      expect(getLocalProviders).toHaveBeenCalledWith(
        expect.objectContaining({
          getInjector: 'getInjector',
          getContext: 'getContext',
          getComponent: 'getComponent',
          getConfig: 'getConfig',
          updateConfig: 'updateConfig',
          isConfigValid: 'isConfigValid',
        }),
      );

      localInjector.get('something');

      expect(parentGet).toHaveBeenCalledWith(
        'something',
        undefined,
        expect.anything(),
      );
    });
  });
});
