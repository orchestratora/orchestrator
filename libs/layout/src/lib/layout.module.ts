import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlatComponent } from './layout-flat/layout-flat.component';
import { FlexWrapDirective, FlexDirectionDirective } from './flex';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule],
  declarations: [LayoutFlatComponent, FlexWrapDirective, FlexDirectionDirective],
  exports: [LayoutFlatComponent, FlexWrapDirective, FlexDirectionDirective],
})
export class LayoutModule {}
