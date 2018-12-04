import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlexModule } from './flex';
import { LayoutFlatComponent } from './layout-flat/layout-flat.component';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule, LayoutFlexModule],
  declarations: [LayoutFlatComponent],
  exports: [LayoutFlexModule, LayoutFlatComponent],
})
export class LayoutModule {}
