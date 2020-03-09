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

      const { getInjector } = getLocalProviders.calls.mostRecent().args[0];

      expect(getInjector).toEqual(expect.any(Function));
      expect(getInjector()).toBe(localInjector);

      localInjector.get('something');

      expect(parentGet).toHaveBeenCalledWith(
        'something',
        undefined,
        expect.anything(),
      );
    });
  });
});
