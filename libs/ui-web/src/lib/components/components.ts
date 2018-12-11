import { Type } from '@angular/core';
import { OrchestratorDynamicComponentType } from '@orchestrator/core';

import { UiWebButtonHostComponent } from './ui-web-button-host';
import { UiWebHeadingHostComponent } from './ui-web-heading-host';
import { UiWebImageHostComponent } from './ui-web-image-host';
import { UiWebInputHostComponent } from './ui-web-input-host';
import { UiWebTextHostComponent } from './ui-web-text-host';
import { UiWebSelectComponent } from './ui-web-select';
import { UiWebSelectHostComponent } from './ui-web-select-host';
import { UiWebTextareaHostComponent } from './ui-web-textarea-host';

export const COMPONENTS: Type<any>[] = [UiWebSelectComponent];

export const HOST_COMPONENTS: OrchestratorDynamicComponentType[] = [
  UiWebButtonHostComponent,
  UiWebTextHostComponent,
  UiWebImageHostComponent,
  UiWebHeadingHostComponent,
  UiWebInputHostComponent,
  UiWebSelectHostComponent,
  UiWebTextareaHostComponent,
];
