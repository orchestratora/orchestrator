import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlatComponent } from './layout-flat/layout-flat.component';
import { FlexWrapDirective, FlexDirective, FlexDirectionDirective } from './flex';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, OrchestratorCoreModule],
  declarations: [LayoutFlatComponent, FlexWrapDirective, FlexDirective, FlexDirectionDirective],
  exports: [LayoutFlatComponent],
})
export class LayoutModule {}
