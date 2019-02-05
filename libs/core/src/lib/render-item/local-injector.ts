import {
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

import { InjectorMap } from '../types';
import { getLocalProviders, LOCAL_INJECTOR_MAP } from './local-injector-map';

/**
 * Multi-provider of {@link InjectorMap}
 */
export const INJECTOR_MAP = new InjectionToken<InjectorMap[]>('INJECTOR_MAP', {
  factory: () => [LOCAL_INJECTOR_MAP],
});

export interface LocalInjectorParams {
  parentInjector: Injector;
  getComponent: () => any;
  getConfig: () => any;
  isConfigValid: () => boolean;
  getRenderItem: () => any;
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
      getRenderItem: this.params.getRenderItem,
    }),
    parent: this.params.parentInjector,
  });

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

    token = token.toLowerCase();

    const injectorMap = this.params.injectorMap.find(m => token in m);
    return injectorMap ? injectorMap[token] : token;
  }
}

@Injectable()
export class LocalInjectorFactory {
  constructor(@Inject(INJECTOR_MAP) private injectorMap: InjectorMap[]) {}

  create(params: LocalInjectorParams) {
    return new LocalInjector({
      ...params,
      injectorMap: this.injectorMap,
    });
  }
}
