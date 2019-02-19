import {
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  Provider,
  Type,
} from '@angular/core';

import { InjectorMap } from '../types';

export interface InjectorMapToken extends Array<InjectorMap> {}

/**
 * Multi-provider of {@link InjectorMap}
 */
export const INJECTOR_MAP_TOKEN = new InjectionToken<InjectorMapToken>(
  'INJECTOR_MAP',
);

/**
 * Helper to provide {@link INJECTOR_MAP_TOKEN}
 */
export function provideInjectorMap(map: InjectorMap): Provider {
  return { provide: INJECTOR_MAP_TOKEN, useValue: map, multi: true };
}

/**
 * Maps tokens to other tokens and then executes parent injector.
 *
 * NOT a Service!
 * Use via {@link MappedInjectorFactory}
 */
export class MappedInjector implements Injector {
  private injectorMap: InjectorMap;

  constructor(
    private parent: Injector,
    private injectorMaps: InjectorMapToken,
  ) {}

  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  get(token: any, notFoundValue?: any, flags?: InjectFlags): any;
  get(token: any, notFoundValue?: any, flags?: any) {
    return this.parent.get(this.mapToken(token), notFoundValue, flags);
  }

  private mapToken(token: any): any {
    if (typeof token !== 'string') {
      return token;
    }

    this.maybeInitInjectorMap();

    token = this.processToken(token);

    return token in this.injectorMap ? this.injectorMap[token] : token;
  }

  private maybeInitInjectorMap() {
    if (!this.injectorMap) {
      this.injectorMap = this.injectorMaps.reduce(
        (acc, m) =>
          Object.keys(m).reduce(
            (obj, k) => ({ ...obj, [this.processToken(k)]: m[k] }),
            acc,
          ),
        Object.create(null),
      );
    }
  }

  private processToken(t: string) {
    return t.toLowerCase();
  }
}

/**
 * Factory for {@link MappedInjector}
 */
@Injectable()
export class MappedInjectorFactory {
  constructor(
    @Inject(INJECTOR_MAP_TOKEN) private injectorMap: InjectorMapToken,
  ) {}

  /**
   * Creates MappedInjector with parent injector and {@link INJECTOR_MAP_TOKEN} from DI
   */
  create(parent: Injector): Injector {
    return new MappedInjector(parent, this.injectorMap);
  }
}
