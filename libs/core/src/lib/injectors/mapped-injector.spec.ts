import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InjectorMap } from '../types';
import {
  InjectorMapToken,
  MappedInjector,
  MappedInjectorFactory,
  provideInjectorMap,
} from './mapped-injector';

describe('MappedInjector', () => {
  describe('get() method', () => {
    it('should call parent `injector.get()` with mapped token from `this.injectorMap`', () => {
      const injector: Injector = { get: jest.fn() };
      const injectorMap: InjectorMapToken = [
        { token1: 'resolved-token1' as any },
        { token2: 'resolved-token2' as any, token3: 'resolved-token3' as any },
      ];

      const mappedInjector = new MappedInjector(injector, injectorMap);

      mappedInjector.get('token1', 'default', 'flags' as any);

      expect(injector.get).toHaveBeenCalledWith(
        'resolved-token1',
        'default',
        'flags',
      );

      mappedInjector.get('token2', 'default', 'flags' as any);

      expect(injector.get).toHaveBeenCalledWith(
        'resolved-token2',
        'default',
        'flags',
      );

      mappedInjector.get('token3', 'default', 'flags' as any);

      expect(injector.get).toHaveBeenCalledWith(
        'resolved-token3',
        'default',
        'flags',
      );
    });

    it('should call parent `injector.get()` with original token when not found in `this.injectorMap`', () => {
      const injector: Injector = { get: jest.fn() };
      const injectorMap: InjectorMapToken = [
        { token: 'resolved-token' as any },
      ];

      const mappedInjector = new MappedInjector(injector, injectorMap);

      mappedInjector.get('other-token', 'default', 'flags' as any);

      expect(injector.get).toHaveBeenCalledWith(
        'other-token',
        'default',
        'flags',
      );
    });

    it('should map token to `null/undefined`', () => {
      const injector: Injector = { get: jest.fn() };
      const injectorMap: InjectorMapToken = [
        { token1: null as any },
        { token2: undefined as any },
      ];

      const mappedInjector = new MappedInjector(injector, injectorMap);

      mappedInjector.get('token1', 'default', 'flags' as any);
      expect(injector.get).toHaveBeenCalledWith(null, 'default', 'flags');

      mappedInjector.get('token2', 'default', 'flags' as any);
      expect(injector.get).toHaveBeenCalledWith(undefined, 'default', 'flags');
    });
  });
});

describe('Service: MappedInjectorFactory', () => {
  describe('create() method', () => {
    it('should return `MappedInjector` with `parent` injector and `INJECTOR_MAP_TOKEN`', () => {
      const injectorMap: InjectorMap = { token: 'resolved-token' as any };
      const injector: Injector = { get: jest.fn() };

      TestBed.configureTestingModule({
        providers: [MappedInjectorFactory, provideInjectorMap(injectorMap)],
      });

      const factory = TestBed.inject(MappedInjectorFactory);

      const mappedInjector = factory.create(injector);

      expect(mappedInjector).toEqual(expect.any(MappedInjector));

      mappedInjector.get('token' as any, 'default', 'flags' as any);

      expect(injector.get).toHaveBeenCalledWith(
        'resolved-token',
        'default',
        'flags',
      );
    });
  });
});
