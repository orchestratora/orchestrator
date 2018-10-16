import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule, Type } from '@angular/core';

import { COMPONENT_MAP, ComponentMap, COMPONENTS } from './component-map';

@NgModule({
  imports: [CommonModule],
})
export class OrchestratorCoreModule {
  static withComponents(components: Type<any>[], compMap?: ComponentMap): ModuleWithProviders {
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
