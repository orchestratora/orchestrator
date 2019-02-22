import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule, provideInjectorMap } from '@orchestrator/core';

import { StepHostComponent } from './step-host/step-host.component';
import { Stepper } from './stepper';
import { StepperHostComponent } from './stepper-host/stepper-host.component';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  imports: [
    CommonModule,
    OrchestratorCoreModule.withComponents([
      StepperHostComponent,
      StepHostComponent,
    ]),
  ],
  declarations: [StepperHostComponent, StepperComponent, StepHostComponent],
  exports: [
    OrchestratorCoreModule,
    StepperComponent,
    StepperHostComponent,
    StepHostComponent,
  ],
})
export class StepperModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StepperModule,
      providers: [provideInjectorMap({ Stepper: Stepper as any })],
    };
  }
}
