import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatAlignContentOptions } from '../types';

@Directive({
  selector: '[orcFlexAlignContent]',
})
export class FlexAlignContentDirective {
  @Input()
  @HostBinding('style.align-content')
  orcFlexAlignContent: LayoutFlatAlignContentOptions;
}
