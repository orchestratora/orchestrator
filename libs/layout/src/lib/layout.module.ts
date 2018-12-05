import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlexModule } from './flex';
import { LayoutFlatHostComponent } from './layout-flat-host/layout-flat-host.component';
import { LayoutFlatComponent } from './layout-flat/layout-flat.component';

@NgModule({
  imports: [
    CommonModule,
    OrchestratorCoreModule.withComponents([LayoutFlatHostComponent]),
    LayoutFlexModule,
  ],
  declarations: [LayoutFlatComponent, LayoutFlatHostComponent],
  exports: [LayoutFlexModule, LayoutFlatComponent, LayoutFlatHostComponent],
})
export class LayoutModule {}
