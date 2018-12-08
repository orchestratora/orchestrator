import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { COMPONENTS, HOST_COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule.withComponents(HOST_COMPONENTS)],
  exports: [...HOST_COMPONENTS, ...COMPONENTS],
  declarations: [...HOST_COMPONENTS, ...COMPONENTS],
})
export class UiWebModule {}
