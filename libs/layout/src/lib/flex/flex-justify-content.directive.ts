import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatJustifyOptions } from '../types';

@Directive({
  selector: '[orcFxJustifyContent]',
})
export class FlexJustifyContentDirective {
  @Input()
  @HostBinding('style.justify-content')
  orcFxJustifyContent: LayoutFlatJustifyOptions;
}
