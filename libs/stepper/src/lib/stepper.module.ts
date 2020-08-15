import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule, provideInjectorMap } from '@orchestrator/core';

import { StepHostComponent } from './step-host/step-host.component';
import { Stepper } from './stepper.class';
import { StepperHostComponent } from './stepper-host/stepper-host.component';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule],
  declarations: [StepperHostComponent, StepperComponent, StepHostComponent],
  exports: [
    OrchestratorCoreModule,
    StepperComponent,
    StepperHostComponent,
    StepHostComponent,
  ],
})
export class StepperModule {
  static forRoot(): ModuleWithProviders<StepperModule> {
    return {
      ngModule: StepperModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([
          StepperHostComponent,
          StepHostComponent,
        ]),
        provideInjectorMap({ Stepper: Stepper as any }),
      ],
    };
  }
}
