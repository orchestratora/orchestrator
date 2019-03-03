import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { LayoutModule } from '@orchestrator/layout';
import { StepperModule } from '@orchestrator/stepper';
import { UiWebModule } from '@orchestrator/ui-web';

import { SharedModule } from '../shared/shared.module';
import { StepperComponent } from './stepper.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: StepperComponent }]),
    OrchestratorCoreModule.forRoot(),
    StepperModule.forRoot(),
    UiWebModule.forRoot(),
    LayoutModule.forRoot(),
  ],
  declarations: [StepperComponent],
})
export class StepperExampleModule {}
