import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatAlignContentOptions } from '../types';

@Directive({
  selector: '[orcFxAlignContent]',
})
export class FlexAlignContentDirective {
  @Input()
  @HostBinding('style.align-content')
  orcFxAlignContent: LayoutFlatAlignContentOptions;
}
