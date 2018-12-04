import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatAlignItemsOptions } from '../types';

@Directive({
  selector: '[orcFlexAlignItems]',
})
export class FlexAlignItemsDirective {
  @Input()
  @HostBinding('style.align-items')
  orcFlexAlignItems: LayoutFlatAlignItemsOptions;
}
