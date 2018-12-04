import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[orcFlexDirection]',
  exportAs: 'orcFlexDirection',
})
export class FlexDirectionDirective {
  @Input()
  @HostBinding('style.flex-direction')
  orcFlexDirection = 'row';
}
