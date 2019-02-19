import { Type } from '@angular/core';

import { OrchestratorDynamicComponentType } from '../types';
import { createMetadataGetSet } from './util';

export interface DynamicComponentOptions<C> {
  config: Type<C>;
}

const dynamicComponentMeta = createMetadataGetSet<DynamicComponentOptions<any>>(
  'DynamicComponentMeta',
);

export function DynamicComponent<C>(
  options: DynamicComponentOptions<C>,
): ClassDecorator {
  return target => dynamicComponentMeta.set(options, target);
}

export function getDynamicComponentMeta<C>(
  type: OrchestratorDynamicComponentType<C>,
): DynamicComponentOptions<C> | undefined {
  return dynamicComponentMeta.get(type);
}
