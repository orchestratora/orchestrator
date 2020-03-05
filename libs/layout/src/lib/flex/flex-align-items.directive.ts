import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatAlignItemsOptions } from '../types';

@Directive({
  selector: '[orcFxAlignItems]',
})
export class FlexAlignItemsDirective {
  @Input()
  @HostBinding('style.align-items')
  orcFxAlignItems: LayoutFlatAlignItemsOptions;
}
