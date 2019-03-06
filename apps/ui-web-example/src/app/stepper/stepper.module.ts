import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { LayoutModule } from '@orchestrator/layout';
import { StepperModule } from '@orchestrator/stepper';
import {
  UiWebButtonHostModule,
  UiWebHeadingHostModule,
  UiWebImageHostModule,
  UiWebTextHostModule,
} from '@orchestrator/ui-web';

import { SharedModule } from '../shared/shared.module';
import { StepperComponent } from './stepper.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: StepperComponent }]),
    OrchestratorCoreModule.forRoot(),
    StepperModule.forRoot(),
    LayoutModule.forRoot(),
    UiWebButtonHostModule.forRoot(),
    UiWebImageHostModule.forRoot(),
    UiWebTextHostModule.forRoot(),
    UiWebHeadingHostModule.forRoot(),
  ],
  declarations: [StepperComponent],
})
export class StepperExampleModule {}
