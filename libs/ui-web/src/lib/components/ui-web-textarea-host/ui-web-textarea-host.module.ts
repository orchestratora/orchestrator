import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebTextAreaConfig } from './ui-web-textarea-config';
import { UiWebTextareaHostComponent } from './ui-web-textarea-host.component';

@NgModule({
  declarations: [UiWebTextareaHostComponent],
  exports: [UiWebTextareaHostComponent],
})
export class UiWebTextareaHostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiWebTextareaHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([
          UiWebTextareaHostComponent,
        ]),
        UiWebTextAreaConfig,
      ],
    };
  }
}
