import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[orcFlexDirection]',
  exportAs: 'orcFlexDirection',
})
export class FlexDirectionDirective {
  @HostBinding('style.flex-direction') _flexDirection = 'row';

  @Input('orcFlexDirection')
  set flexDirection(val: string) {
    this._flexDirection = val;
  }
}
