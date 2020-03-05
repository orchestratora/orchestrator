import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  Dynamic1Component,
  Dynamic2Component,
  DynamicBaseComponent,
} from './dynamic-components';

/**
 * This is purely for NGC to compile package. DO NOT USE IT!
 * @internal
 */
@NgModule({
  imports: [CommonModule],
  declarations: [DynamicBaseComponent, Dynamic1Component, Dynamic2Component],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SinkModule {}
