import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

import { COMPONENTS } from '../components-token';
import {
  ComponentMap,
  ComponentRegistry,
  DefaultDynamicComponent,
} from '../component-registry';
import { getDynamicComponentMeta } from '../metadata/dynamic-component';
import {
  GetOrchestratorDynamicComponentConfig,
  OrchestratorDynamicComponentType,
} from '../types';

/**
 * Service that holds references to all dynamic components
 * and can resolve them by mapping
 * as well as resolve their configurations
 */
@Injectable()
export class ComponentLocatorService {
  private componentRegistry = this.injector.get(COMPONENTS, []);

  private componentArray = this.componentRegistry
    .filter(isComponentArray)
    .reduce((arr, reg) => [...arr, ...reg], []);

  private componentArrayMap = this.componentArray
    .map((type) => this.cfr.resolveComponentFactory(type))
    .reduce(
      (map, compFactory) => ({
        ...map,
        [compFactory.selector]: compFactory.componentType,
      }),
      Object.create(null) as ComponentMap,
    );

  private componentMaps = this.componentRegistry.filter(isComponentMap);
  private componentMap = this.componentMaps.reduce(
    (obj, map) => ({ ...obj, ...map }),
    this.componentArrayMap as ComponentMap,
  );

  private components = Object.keys(this.componentMap).map(
    (key) => this.componentMap[key],
  );

  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
  ) {}

  /**
   * Will resolve dynamic component by mapping and return it's type
   */
  resolve<T, C = GetOrchestratorDynamicComponentConfig<T>>(
    component: string | OrchestratorDynamicComponentType<C>,
  ): OrchestratorDynamicComponentType<C> | undefined {
    if (typeof component === 'function') {
      return component;
    }

    return this.componentMap[component];
  }

  /**
   * Will resolve default configuration of dynamic component
   */
  getDefaultConfig<C>(
    component: OrchestratorDynamicComponentType<C>,
  ): C | null {
    const configType = this.getConfigType(component);

    if (!configType) {
      return null;
    }

    return this.injector.get(configType, null);
  }

  /**
   * Will resolve configuration type of dynamic component
   */
  getConfigType<C>(
    component: OrchestratorDynamicComponentType<C>,
  ): Type<C> | null {
    if (!component) {
      return null;
    }

    const meta = getDynamicComponentMeta(component);

    if (!meta) {
      return null;
    }

    return meta.config;
  }

  /**
   * Will return array of all available components in orchestrator
   */
  getComponents(): OrchestratorDynamicComponentType[] {
    return this.components;
  }
}

function isComponentArray(
  reg: ComponentRegistry,
): reg is DefaultDynamicComponent[] {
  return Array.isArray(reg);
}

function isComponentMap(reg: ComponentRegistry): reg is ComponentMap {
  return !!reg && !Array.isArray(reg);
}
