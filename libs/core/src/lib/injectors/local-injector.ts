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
import {
  getLocalProviders,
  LocalGetComponentToken,
  LocalGetConfigToken,
  LocalIsConfigValidToken,
} from './local-injector-map';

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

export interface LocalInjectorParams {
  parentInjector: Injector;
  getComponent: LocalGetComponentToken;
  getConfig: LocalGetConfigToken;
  isConfigValid: LocalIsConfigValidToken;
}

export interface GlobalInjectorParams {
  injectorMap: InjectorMap[];
}

export interface InjectorParams
  extends GlobalInjectorParams,
    LocalInjectorParams {}

export class LocalInjector implements Injector {
  private localInjector = Injector.create({
    providers: getLocalProviders({
      getInjector: () => this,
      getComponent: this.params.getComponent,
      getConfig: this.params.getConfig,
      isConfigValid: this.params.isConfigValid,
    }),
    parent: this.params.parentInjector,
  });

  private injectorMaps: InjectorMap[];

  constructor(private params: InjectorParams) {}

  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  get(token: any, notFoundValue?: any, flags?: any): any;
  get(token: any, notFoundValue?: any, flags?: any) {
    return this.localInjector.get(this.mapToken(token), notFoundValue, flags);
  }

  private mapToken(token: any): any {
    if (typeof token !== 'string') {
      return token;
    }

    this.maybeInitInjectorMaps();

    token = this.processToken(token);

    const injectorMap = this.injectorMaps.find(m => token in m);
    return injectorMap ? injectorMap[token] : token;
  }

  private maybeInitInjectorMaps() {
    if (!this.injectorMaps) {
      this.injectorMaps = this.params.injectorMap.map(m =>
        Object.keys(m).reduce(
          (obj, k) => ({ ...obj, [this.processToken(k)]: m[k] }),
          {},
        ),
      );
    }
  }

  private processToken(t: string) {
    return t.toLowerCase();
  }
}

@Injectable()
export class LocalInjectorFactory {
  constructor(
    @Inject(INJECTOR_MAP_TOKEN) private injectorMap: InjectorMapToken,
  ) {}

  create(params: LocalInjectorParams) {
    return new LocalInjector({
      ...params,
      injectorMap: this.injectorMap,
    });
  }
}
