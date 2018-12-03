import { Injectable, Injector } from '@angular/core';

import { ComponentMap, COMPONENTS, ComponentRegistry } from '../component-map';
import { GetOrchestratorDynamicComponentConfig, OrchestratorDynamicComponentType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ComponentLocatorService {
  private componentRegistry = this.injector.get(COMPONENTS);
  private componentMaps = this.componentRegistry.filter(isComponentMap);
  private componentMap = this.componentMaps.reduce(
    (obj, map) => ({ ...obj, ...map }),
    Object.create(null) as ComponentMap,
  );

  constructor(private injector: Injector) {}

  resolve<T, C = GetOrchestratorDynamicComponentConfig<T>>(
    component: string | OrchestratorDynamicComponentType<C>,
  ): OrchestratorDynamicComponentType<C> | undefined {
    if (typeof component === 'function') {
      return component;
    }

    return this.componentMap[component];
  }
}

function isComponentMap(reg: ComponentRegistry): reg is ComponentMap {
  return !!reg && !Array.isArray(reg);
}
