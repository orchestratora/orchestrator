import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ComponentRegistry,
  OrchestratorCoreModule,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';

import { provideDynamicComponents } from './dynamic-components';

@NgModule({})
export class OrchestratorCoreTestingModule {
  static withComponents(
    components: ComponentRegistry<OrchestratorDynamicComponentType<any>>,
  ): ModuleWithProviders {
    return {
      ngModule: OrchestratorCoreModule,
      providers: [
        ...OrchestratorCoreModule.withComponents(components).providers,
        provideDynamicComponents(components),
      ],
    };
  }
}
