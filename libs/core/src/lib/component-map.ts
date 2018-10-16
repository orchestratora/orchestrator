import { InjectionToken, Type } from '@angular/core';

export interface ComponentMap {
  [k: string]: Type<any>;
}

export const COMPONENTS = new InjectionToken<Type<any>[]>('COMPONENTS');
export const COMPONENT_MAP = new InjectionToken<ComponentMap>('COMPONENT_MAP');
