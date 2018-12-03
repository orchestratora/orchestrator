import { InjectionToken, Type } from '@angular/core';

import { OrchestratorDynamicComponentType } from './types';

export type DefaultDynamicComponent = OrchestratorDynamicComponentType;

export interface ComponentMap<T extends Type<any> = DefaultDynamicComponent> {
  [k: string]: T;
}

export type ComponentRegistry<T extends Type<any> = DefaultDynamicComponent> =
  | T[]
  | ComponentMap<T>;

export const COMPONENTS = new InjectionToken<ComponentRegistry[]>('COMPONENTS');
