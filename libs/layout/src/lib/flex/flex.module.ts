import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexAlignContentDirective } from './flex-align-content.directive';
import { FlexAlignItemsDirective } from './flex-align-items.directive';
import { FlexDirectionDirective } from './flex-direction.directive';
import { FlexJustifyContentDirective } from './flex-justify-content.directive';
import { FlexWrapDirective } from './flex-wrap.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    FlexWrapDirective,
    FlexJustifyContentDirective,
    FlexDirectionDirective,
    FlexAlignItemsDirective,
    FlexAlignContentDirective,
  ],
  declarations: [
    FlexWrapDirective,
    FlexJustifyContentDirective,
    FlexDirectionDirective,
    FlexAlignItemsDirective,
    FlexAlignContentDirective,
  ],
})
export class LayoutFlexModule {}
