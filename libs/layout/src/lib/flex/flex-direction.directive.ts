import { Directive, HostBinding, Input } from '@angular/core';

import { LayoutFlatDirectionOptions } from '../types';

@Directive({
  selector: '[orcFxDirection]',
})
export class FlexDirectionDirective {
  @Input()
  @HostBinding('style.flex-direction')
  orcFxDirection: LayoutFlatDirectionOptions = 'row';
}
