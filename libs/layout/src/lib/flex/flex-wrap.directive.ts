import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[orcFlexWrap]',
  exportAs: 'orcFlexWrap',
})
export class FlexWrapDirective {
  @Input()
  @HostBinding('style.flex-wrap')
  orcFlexWrap: string;
}
