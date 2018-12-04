import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatJustifyOptions } from '../types';

@Directive({
  selector: '[orcFlexJustifyContent]',
})
export class FlexJustifyContentDirective {
  @Input()
  @HostBinding('style.justify-content')
  orcFlexJustifyContent: LayoutFlatJustifyOptions;
}
