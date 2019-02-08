import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  LocalInjector,
  LocalInjectorFactory,
  provideInjectorMap,
} from './local-injector';
import { LOCAL_INJECTOR_MAP } from './local-injector-map';
import * as localInjectorMap from './local-injector-map';

describe('LocalInjector', () => {
  describe('get() method', () => {
    it('should create injector from `getLocalProviders()`', () => {
      class MyType {}
      class MyType2 {}

      const providers = [
        { provide: MyType, useValue: MyType },
        { provide: MyType2, useValue: MyType2 },
      ];

      const getLocalProviders = spyOn(
        localInjectorMap,
        'getLocalProviders',
      ).and.returnValue(providers);

      const localInjector = new LocalInjector({
        parentInjector: { get: () => 'from-parent' },
        injectorMap: [{ MyType }, { MyType2 }],
        getComponent: 'getComponent' as any,
        getConfig: 'getConfig' as any,
        isConfigValid: 'isConfigValid' as any,
      });

      expect(getLocalProviders).toHaveBeenCalledWith({
        getInjector: expect.any(Function),
        getComponent: 'getComponent',
        getConfig: 'getConfig',
        isConfigValid: 'isConfigValid',
      });

      const { getInjector } = getLocalProviders.calls.mostRecent().args[0];

      expect(getInjector()).toBe(localInjector);

      const res = localInjector.get('MyType');
      const res2 = localInjector.get('mytype');
      const res3 = localInjector.get('MyType2');

      expect(res).toBe(MyType);
      expect(res2).toBe(res);
      expect(res3).toBe(MyType2);

      expect(localInjector.get('non-existing')).toBe('from-parent');
    });
  });
});

describe('Service: LocalInjectorFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalInjectorFactory, provideInjectorMap(LOCAL_INJECTOR_MAP)],
    });
  });

  describe('create() method', () => {
    it('should return instance of `LocalInjector`', () => {
      expect(getService().create({} as any)).toEqual(expect.any(LocalInjector));
    });

    describe('default local injector', () => {
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
    });

    describe('extended local injector', () => {
      class CustomToken {}

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: CustomToken, useValue: CustomToken },
            provideInjectorMap({ CustomToken }),
          ],
        });
      });

      it('should resolve custom mapped tokens', () => {
        const injector = getLocalInjector(TestBed);

        const res = injector.get('CustomToken');
        const res2 = injector.get('customToken');

        expect(res).toBe(CustomToken);
        expect(res2).toBe(CustomToken);
      });

      it('should resolve default mapped tokens', () => {
        const injector = getLocalInjector(TestBed);

        const res = injector.get('getComponent');

        expect(res).toEqual(expect.any(Function));
        expect(res()).toBe('component');
      });
    });
  });
});

function getService(): LocalInjectorFactory {
  return TestBed.get(LocalInjectorFactory);
}

function getLocalInjector(parentInjector: Injector = { get: () => null }) {
  return getService().create({
    getComponent: () => 'component',
    getConfig: () => 'config',
    isConfigValid: () => true,
    parentInjector,
  });
}
