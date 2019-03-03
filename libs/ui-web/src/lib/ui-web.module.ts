import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import {
  UiWebButtonConfig,
  UiWebHeadingConfig,
  UiWebImageConfig,
  UiWebInputConfig,
  UiWebTextConfig,
  UiWebSelectConfig,
  UiWebTextAreaConfig,
} from './components';
import { COMPONENTS, HOST_COMPONENTS } from './components/components';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule],
  exports: [OrchestratorCoreModule, ...HOST_COMPONENTS, ...COMPONENTS],
  declarations: [...HOST_COMPONENTS, ...COMPONENTS],
})
export class UiWebModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiWebModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents(HOST_COMPONENTS),
        UiWebButtonConfig,
        UiWebHeadingConfig,
        UiWebImageConfig,
        UiWebInputConfig,
        UiWebTextConfig,
        UiWebSelectConfig,
        UiWebTextAreaConfig,
      ],
    };
  }
}
