import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';

import {
  ComponentMap,
  COMPONENTS,
  ComponentRegistry,
  DefaultDynamicComponent,
} from '../component-map';
import { GetOrchestratorDynamicComponentConfig, OrchestratorDynamicComponentType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ComponentLocatorService {
  private componentRegistry = this.injector.get(COMPONENTS);

  private componentArray = this.componentRegistry
    .filter(isComponentArray)
    .reduce((arr, reg) => [...arr, ...reg], []);

  private componentArrayMap = this.componentArray
    .map(type => this.cfr.resolveComponentFactory(type))
    .reduce(
      (map, compFactory) => ({ ...map, [compFactory.selector]: compFactory.componentType }),
      Object.create(null) as ComponentMap,
    );

  private componentMaps = this.componentRegistry.filter(isComponentMap);
  private componentMap = this.componentMaps.reduce((obj, map) => ({ ...obj, ...map }), this
    .componentArrayMap as ComponentMap);

  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) {}

  resolve<T, C = GetOrchestratorDynamicComponentConfig<T>>(
    component: string | OrchestratorDynamicComponentType<C>,
  ): OrchestratorDynamicComponentType<C> | undefined {
    if (typeof component === 'function') {
      return component;
    }

    return this.componentMap[component];
  }
}

function isComponentArray(reg: ComponentRegistry): reg is DefaultDynamicComponent[] {
  return Array.isArray(reg);
}

function isComponentMap(reg: ComponentRegistry): reg is ComponentMap {
  return !!reg && !Array.isArray(reg);
}
