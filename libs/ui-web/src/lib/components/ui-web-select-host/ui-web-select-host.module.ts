import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { UiWebSelectComponent } from '../ui-web-select/ui-web-select.component';
import { UiWebSelectConfig } from './ui-web-select-config';
import { UiWebSelectHostComponent } from './ui-web-select-host.component';

@NgModule({
  imports: [CommonModule],
  exports: [UiWebSelectHostComponent, UiWebSelectComponent],
  declarations: [UiWebSelectHostComponent, UiWebSelectComponent],
})
export class UiWebSelectHostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiWebSelectHostModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([
          UiWebSelectHostComponent,
        ]),
        UiWebSelectConfig,
      ],
    };
  }
}
