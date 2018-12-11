import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlexModule } from './flex';
import { LayoutFlatConfig } from './layout-flat-host/layout-flat-config';
import { LayoutFlatHostComponent } from './layout-flat-host/layout-flat-host.component';
import { LayoutFlatComponent } from './layout-flat/layout-flat.component';

@NgModule({
  imports: [
    CommonModule,
    OrchestratorCoreModule.withComponents([LayoutFlatHostComponent]),
    LayoutFlexModule,
  ],
  exports: [OrchestratorCoreModule, LayoutFlexModule, LayoutFlatComponent, LayoutFlatHostComponent],
  declarations: [LayoutFlatComponent, LayoutFlatHostComponent],
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule,
      providers: [LayoutFlatConfig],
    };
  }
}
