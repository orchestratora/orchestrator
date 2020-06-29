import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlexModule } from '../flex';
import { LayoutFlatComponent } from '../layout-flat';
import { LayoutFlatConfig } from './layout-flat-config';
import { LayoutFlatHostComponent } from './layout-flat-host.component';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule, LayoutFlexModule],
  exports: [LayoutFlatHostComponent, LayoutFlatComponent],
  declarations: [LayoutFlatHostComponent, LayoutFlatComponent],
})
export class LayoutFlatHostModule {
  static forRoot(): ModuleWithProviders<LayoutFlatHostModule> {
    return {
      ngModule: LayoutFlatHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([LayoutFlatHostComponent]),
        LayoutFlatConfig,
      ],
    };
  }
}
