import { InjectionToken, Injector, StaticProvider, Type } from '@angular/core';

import { RenderComponent } from '../render-component';
import { InjectorMap } from '../types';

export type LocalGetInjectorToken = () => Injector;
export type LocalGetComponentToken<T = any> = () => T;
export type LocalGetConfigToken<T = any> = () => T;
export type LocalGetContextToken<T = any> = () => T;
export type LocalUpdateConfigToken<T = any> = (config: Partial<T>) => T;
export type LocalIsConfigValidToken = () => boolean;

export const LOCAL_GET_INJECTOR = new InjectionToken<LocalGetInjectorToken>(
  'LOCAL_GET_INJECTOR',
);

export const LOCAL_GET_COMPONENT = new InjectionToken<LocalGetComponentToken>(
  'LOCAL_GET_COMPONENT',
);

export const LOCAL_GET_CONFIG = new InjectionToken<LocalGetConfigToken>(
  'LOCAL_GET_CONFIGURATION',
);

export const LOCAL_GET_CONTEXT = new InjectionToken<LocalGetContextToken>(
  'LOCAL_GET_CONTEXT',
);

export const LOCAL_UPDATE_CONFIG = new InjectionToken<LocalUpdateConfigToken>(
  'LOCAL_UPDATE_CONFIG',
);

export const LOCAL_GET_CONFIG_VALID = new InjectionToken<
  LocalIsConfigValidToken
>('LOCAL_GET_CONFIGURATION_VALID');

export const LOCAL_INJECTOR_MAP: InjectorMap = {
  getInjector: LOCAL_GET_INJECTOR,
  getComponent: LOCAL_GET_COMPONENT,
  getConfig: LOCAL_GET_CONFIG,
  getContext: LOCAL_GET_CONTEXT,
  updateConfig: LOCAL_UPDATE_CONFIG,
  isConfigValid: LOCAL_GET_CONFIG_VALID,
  renderComponent: RenderComponent as Type<RenderComponent>,
};

export interface LocalProvidersData {
  getInjector: LocalGetInjectorToken;
  getComponent: LocalGetComponentToken;
  getConfig: LocalGetConfigToken;
  getContext: LocalGetContextToken;
  updateConfig: LocalUpdateConfigToken;
  isConfigValid: LocalIsConfigValidToken;
}

export function getLocalProviders(data: LocalProvidersData): StaticProvider[] {
  return [
    {
      provide: LOCAL_GET_INJECTOR,
      useValue: data.getInjector,
    },
    {
      provide: LOCAL_GET_COMPONENT,
      useValue: data.getComponent,
    },
    {
      provide: LOCAL_GET_CONFIG,
      useValue: data.getConfig,
    },
    {
      provide: LOCAL_GET_CONTEXT,
      useValue: data.getContext,
    },
    {
      provide: LOCAL_UPDATE_CONFIG,
      useValue: data.updateConfig,
    },
    {
      provide: LOCAL_GET_CONFIG_VALID,
      useValue: data.isConfigValid,
    },
  ];
}
