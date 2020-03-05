import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebImageConfig } from './ui-web-image-config';
import { UiWebImageHostComponent } from './ui-web-image-host.component';

@NgModule({
  exports: [UiWebImageHostComponent],
  declarations: [UiWebImageHostComponent],
})
export class UiWebImageHostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiWebImageHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([UiWebImageHostComponent]),
        UiWebImageConfig,
      ],
    };
  }
}
