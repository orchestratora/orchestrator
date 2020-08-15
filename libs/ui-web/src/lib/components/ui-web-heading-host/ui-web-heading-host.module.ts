import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebHeadingConfig } from './ui-web-heading-config';
import { UiWebHeadingHostComponent } from './ui-web-heading-host.component';

@NgModule({
  declarations: [UiWebHeadingHostComponent],
  imports: [CommonModule],
  exports: [UiWebHeadingHostComponent],
})
export class UiWebHeadingHostModule {
  static forRoot(): ModuleWithProviders<UiWebHeadingHostModule> {
    return {
      ngModule: UiWebHeadingHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([
          UiWebHeadingHostComponent,
        ]),
        UiWebHeadingConfig,
      ],
    };
  }
}
