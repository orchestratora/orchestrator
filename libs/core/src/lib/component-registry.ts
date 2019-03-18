import { Type } from '@angular/core';

import { OrchestratorDynamicComponentType } from './types';

export type DefaultDynamicComponent = OrchestratorDynamicComponentType;

/**
 * Mapping of strings to dynamic component types
 */
export interface ComponentMap<T extends Type<any> = DefaultDynamicComponent> {
  [k: string]: T;
}

/**
 * Registry of dynamic components
 *
 * Can be array of component types or {@link ComponentMap}
 */
export type ComponentRegistry<T extends Type<any> = DefaultDynamicComponent> =
  | T[]
  | ComponentMap<T>;
