import {
  InjectFlags,
  InjectionToken,
  Injector,
  StaticProvider,
} from '@angular/core';

import { InjectorMap } from '../types';

export type LocalGetInjectorToken = () => Injector;
export type LocalGetInjectFlagsToken = InjectFlags;
export type LocalGetComponentToken = () => any;
export type LocalGetConfigToken = () => any;
export type LocalIsConfigValidToken = () => boolean;
export type LocalGetRenderItemToken = () => any;

export const LOCAL_GET_INJECTOR = new InjectionToken<LocalGetInjectorToken>(
  'LOCAL_GET_INJECTOR',
);

export const LOCAL_GET_INJECT_FLAGS = new InjectionToken<
  LocalGetInjectFlagsToken
>('LOCAL_GET_INJECT_FLAGS');

export const LOCAL_GET_COMPONENT = new InjectionToken<LocalGetComponentToken>(
  'LOCAL_GET_COMPONENT',
);

export const LOCAL_GET_CONFIGURATION = new InjectionToken<LocalGetConfigToken>(
  'LOCAL_GET_CONFIGURATION',
);

export const LOCAL_GET_CONFIGURATION_VALID = new InjectionToken<
  LocalIsConfigValidToken
>('LOCAL_GET_CONFIGURATION_VALID');

export const LOCAL_GET_RENDER_ITEM = new InjectionToken<
  LocalGetRenderItemToken
>('LOCAL_GET_RENDER_ITEM');

export const LOCAL_INJECTOR_MAP: InjectorMap = {
  getinjector: LOCAL_GET_INJECTOR,
  injectflags: LOCAL_GET_INJECT_FLAGS,
  getcomponent: LOCAL_GET_COMPONENT,
  getconfiguration: LOCAL_GET_CONFIGURATION,
  isconfigurationvalid: LOCAL_GET_CONFIGURATION_VALID,
  getrenderitem: LOCAL_GET_RENDER_ITEM,
};

export function getLocalProviders(data: {
  getInjector: LocalGetInjectorToken;
  getComponent: LocalGetComponentToken;
  getConfig: LocalGetConfigToken;
  isConfigValid: LocalIsConfigValidToken;
  getRenderItem: LocalGetRenderItemToken;
}): StaticProvider[] {
  return [
    {
      provide: LOCAL_GET_INJECTOR,
      useValue: data.getInjector,
    },
    {
      provide: LOCAL_GET_INJECT_FLAGS,
      useValue: InjectFlags,
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
      useValue: data.getConfig,
    },
    {
      provide: LOCAL_GET_RENDER_ITEM,
      useValue: data.getRenderItem,
    },
  ];
}
