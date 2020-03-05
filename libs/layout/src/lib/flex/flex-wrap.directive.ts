import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatWrapOptions } from '../types';

@Directive({
  selector: '[orcFxWrap]',
})
export class FlexWrapDirective {
  @Input()
  @HostBinding('style.flex-wrap')
  orcFxWrap: LayoutFlatWrapOptions;
}
