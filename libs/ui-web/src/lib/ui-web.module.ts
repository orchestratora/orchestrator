import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import {
  UiWebButtonConfig,
  UiWebHeadingConfig,
  UiWebImageConfig,
  UiWebInputConfig,
  UiWebLabelConfig,
  UiWebSelectConfig,
  UiWebTextAreaConfig,
} from './components';
import { COMPONENTS, HOST_COMPONENTS } from './components/components';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule.withComponents(HOST_COMPONENTS)],
  exports: [OrchestratorCoreModule, ...HOST_COMPONENTS, ...COMPONENTS],
  declarations: [...HOST_COMPONENTS, ...COMPONENTS],
})
export class UiWebModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiWebModule,
      providers: [
        UiWebButtonConfig,
        UiWebHeadingConfig,
        UiWebImageConfig,
        UiWebInputConfig,
        UiWebLabelConfig,
        UiWebSelectConfig,
        UiWebTextAreaConfig,
      ],
    };
  }
}
