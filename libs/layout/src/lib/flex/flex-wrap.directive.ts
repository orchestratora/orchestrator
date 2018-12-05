import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatWrapOptions } from '../types';

@Directive({
  selector: '[orcFlexWrap]',
})
export class FlexWrapDirective {
  @Input()
  @HostBinding('style.flex-wrap')
  orcFlexWrap: LayoutFlatWrapOptions;
}
