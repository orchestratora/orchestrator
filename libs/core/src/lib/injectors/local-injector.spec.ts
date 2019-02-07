import { LocalInjector } from './local-injector';
import { LOCAL_INJECTOR_MAP } from './local-injector-map';

describe('LocalInjector', () => {
  it('should resolve `getInjector` as string to itself', () => {
    const localInjector = getLocalInjector();

    const res = localInjector.get('getInjector');
    const res2 = localInjector.get('getinjector');

    expect(res).toEqual(expect.any(Function));
    expect(res2).toEqual(res);
    expect(res()).toBe(localInjector);
  });

  it('should resolve `getComponent` as string to `getComponent` function', () => {
    const localInjector = getLocalInjector();

    const res = localInjector.get('getComponent');
    const res2 = localInjector.get('getcomponent');

    expect(res).toEqual(expect.any(Function));
    expect(res2).toBe(res);
    expect(res()).toBe('component');
  });

  it('should resolve `getConfiguration` as string to `getConfig` function', () => {
    const localInjector = getLocalInjector();

    const res = localInjector.get('getConfig');
    const res2 = localInjector.get('getconfig');

    expect(res).toEqual(expect.any(Function));
    expect(res2).toBe(res);
    expect(res()).toBe('config');
  });

  it('should resolve `isConfigValid` as string to `true` function', () => {
    const localInjector = getLocalInjector();

    const res = localInjector.get('isConfigValid');
    const res2 = localInjector.get('isconfigvalid');

    expect(res).toEqual(expect.any(Function));
    expect(res2).toBe(res);
    expect(res()).toBe(true);
  });

  function getLocalInjector() {
    return new LocalInjector({
      injectorMap: [LOCAL_INJECTOR_MAP],
      getComponent: () => 'component',
      getConfig: () => 'config',
      isConfigValid: () => true,
      parentInjector: { get: () => null },
    });
  }
});
