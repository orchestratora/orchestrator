import { InjectionToken, Injector, StaticProvider, Type } from '@angular/core';

import { RenderComponent } from '../render-component';
import { InjectorMap } from '../types';

export type LocalGetInjectorToken = () => Injector;
export type LocalGetComponentToken = () => any;
export type LocalGetConfigToken = () => any;
export type LocalIsConfigValidToken = () => boolean;

export const LOCAL_GET_INJECTOR = new InjectionToken<LocalGetInjectorToken>(
  'LOCAL_GET_INJECTOR',
);

export const LOCAL_GET_COMPONENT = new InjectionToken<LocalGetComponentToken>(
  'LOCAL_GET_COMPONENT',
);

export const LOCAL_GET_CONFIGURATION = new InjectionToken<LocalGetConfigToken>(
  'LOCAL_GET_CONFIGURATION',
);

export const LOCAL_GET_CONFIGURATION_VALID = new InjectionToken<
  LocalIsConfigValidToken
>('LOCAL_GET_CONFIGURATION_VALID');

export const LOCAL_INJECTOR_MAP: InjectorMap = {
  getinjector: LOCAL_GET_INJECTOR,
  getcomponent: LOCAL_GET_COMPONENT,
  getconfig: LOCAL_GET_CONFIGURATION,
  isconfigvalid: LOCAL_GET_CONFIGURATION_VALID,
  getrendercomponent: RenderComponent as Type<RenderComponent>,
};

export function getLocalProviders(data: {
  getInjector: LocalGetInjectorToken;
  getComponent: LocalGetComponentToken;
  getConfig: LocalGetConfigToken;
  isConfigValid: LocalIsConfigValidToken;
}): StaticProvider[] {
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
      provide: LOCAL_GET_CONFIGURATION,
      useValue: data.getConfig,
    },
    {
      provide: LOCAL_GET_CONFIGURATION_VALID,
      useValue: data.isConfigValid,
    },
  ];
}
