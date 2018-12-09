import { Type } from '@angular/core';
import { OrchestratorDynamicComponentType } from '@orchestrator/core';

import { UiWebButtonHostComponent } from './ui-web-button-host';
import { UiWebHeadingHostComponent } from './ui-web-heading-host';
import { UiWebImageHostComponent } from './ui-web-image-host';
import { UiWebLabelHostComponent } from './ui-web-label-host';
import { UiWebInputHostComponent } from './ui-web-input-host';

export const COMPONENTS: Type<any>[] = [];

export const HOST_COMPONENTS: OrchestratorDynamicComponentType[] = [
  UiWebButtonHostComponent,
  UiWebLabelHostComponent,
  UiWebImageHostComponent,
  UiWebHeadingHostComponent,
  UiWebInputHostComponent,
];
