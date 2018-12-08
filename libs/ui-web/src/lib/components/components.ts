import { Type } from '@angular/core';
import { OrchestratorDynamicComponentType } from '@orchestrator/core';

import { UiWebButtonHostComponent } from './ui-web-button-host';
import { UiWebImageHostComponent } from './ui-web-image-host';
import { UiWebLabelHostComponent } from './ui-web-label-host';

export const COMPONENTS: Type<any>[] = [];

export const HOST_COMPONENTS: OrchestratorDynamicComponentType[] = [
  UiWebButtonHostComponent,
  UiWebLabelHostComponent,
  UiWebImageHostComponent,
];
