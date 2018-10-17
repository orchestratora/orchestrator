import { InjectionToken, Type } from '@angular/core';

import { OrchestratorDynamicComponentType } from './types';

export interface ComponentMap<T extends Type<any> = Type<T>> {
  [k: string]: T;
}

export const COMPONENTS = new InjectionToken<OrchestratorDynamicComponentType[]>('COMPONENTS');
export const COMPONENT_MAP = new InjectionToken<ComponentMap<OrchestratorDynamicComponentType>>(
  'COMPONENT_MAP',
);
