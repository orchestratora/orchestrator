import { Type } from '@angular/core';
import { OrchestratorDynamicComponentType } from '@orchestrator/core';

import { UiWebButtonHostComponent } from './ui-web-button-host';
import { UiWebLabelHostComponent } from './ui-web-label-host';

export * from './ui-web-button-host';
export * from './ui-web-label-host';

export const COMPONENTS: Type<any>[] = [];

export const HOST_COMPONENTS: OrchestratorDynamicComponentType[] = [
  UiWebButtonHostComponent,
  UiWebLabelHostComponent,
];
