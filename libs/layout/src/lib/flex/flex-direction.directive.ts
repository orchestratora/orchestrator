import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatDirectionOptions } from '../types';

@Directive({
  selector: '[orcFlexDirection]',
})
export class FlexDirectionDirective {
  @Input()
  @HostBinding('style.flex-direction')
  orcFlexDirection: LayoutFlatDirectionOptions = 'row';
}
