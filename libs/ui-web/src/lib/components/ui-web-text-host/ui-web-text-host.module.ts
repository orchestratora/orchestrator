import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebTextConfig } from './ui-web-text-config';
import { UiWebTextHostComponent } from './ui-web-text-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UiWebTextHostComponent],
  exports: [UiWebTextHostComponent],
})
export class UiWebTextHostModule {
  static forRoot(): ModuleWithProviders<UiWebTextHostModule> {
    return {
      ngModule: UiWebTextHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([UiWebTextHostComponent]),
        UiWebTextConfig,
      ],
    };
  }
}
