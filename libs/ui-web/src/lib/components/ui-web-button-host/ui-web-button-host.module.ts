import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebButtonConfig } from './ui-web-button-config';
import { UiWebButtonHostComponent } from './ui-web-button-host.component';

@NgModule({
  exports: [UiWebButtonHostComponent],
  declarations: [UiWebButtonHostComponent],
})
export class UiWebButtonHostModule {
  static forRoot(): ModuleWithProviders<UiWebButtonHostModule> {
    return {
      ngModule: UiWebButtonHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([
          UiWebButtonHostComponent,
        ]),
        UiWebButtonConfig,
      ],
    };
  }
}
