import { Injectable, Injector } from '@angular/core';

import { COMPONENT_MAP } from '../component-map';
import { GetOrchestratorDynamicComponentConfig, OrchestratorDynamicComponentType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ComponentLocatorService {
  private compMap = this.injector.get(COMPONENT_MAP);

  constructor(private injector: Injector) {}

  resolve<T, C = GetOrchestratorDynamicComponentConfig<T>>(
    component: string | OrchestratorDynamicComponentType<C>,
  ): OrchestratorDynamicComponentType<C> | undefined {
    if (typeof component === 'function') {
      return component;
    }

    return this.compMap ? this.compMap[component] : undefined;
  }
}
