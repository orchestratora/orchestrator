import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';

import { COMPONENT_MAP, ComponentMap, COMPONENTS } from './component-map';
import { OrchestratorComponent } from './orchestrator/orchestrator.component';
import { RenderItemComponent } from './render-item/render-item.component';
import { OrchestratorDynamicComponentType } from './types';

@NgModule({
  imports: [CommonModule, DynamicModule.withComponents([])],
  declarations: [OrchestratorComponent, RenderItemComponent],
  exports: [OrchestratorComponent, RenderItemComponent],
})
export class OrchestratorCoreModule {
  static withComponents(
    components: OrchestratorDynamicComponentType[],
    compMap?: ComponentMap,
  ): ModuleWithProviders {
    return {
      ngModule: OrchestratorCoreModule,
      providers: [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true },
        { provide: COMPONENTS, useValue: components },
        { provide: COMPONENT_MAP, useValue: compMap },
      ],
    };
  }
}
