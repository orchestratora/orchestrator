import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[orcFlexWrap]',
  exportAs: 'orcFlexWrap',
})
export class FlexWrapDirective {
  @HostBinding('style.flex-wrap') _flexWrap: string;

  @Input('orcFlexWrap')
  set flexWrap(val: string) {
    this._flexWrap = val;
  }
}
