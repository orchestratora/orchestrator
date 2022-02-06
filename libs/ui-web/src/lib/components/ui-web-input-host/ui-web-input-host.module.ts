import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebInputConfig } from './ui-web-input-config';
import { UiWebInputHostComponent } from './ui-web-input-host.component';

@NgModule({
  imports: [CommonModule],
  exports: [UiWebInputHostComponent],
  declarations: [UiWebInputHostComponent],
})
export class UiWebInputHostModule {
  static forRoot(): ModuleWithProviders<UiWebInputHostModule> {
    return {
      ngModule: UiWebInputHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([UiWebInputHostComponent]),
        UiWebInputConfig,
      ],
    };
  }
}
