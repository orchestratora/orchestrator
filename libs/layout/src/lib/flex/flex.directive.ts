import { Directive, HostBinding, Input } from '@angular/core';

/**
 * Collection of basic flex styles that can be used in both LayoutGridComponent
 * and LayoutFlatComponent.
 */

@Directive({
  selector: '[orcFlex]',
  exportAs: 'orcFlex',
})
export class FlexDirective {
  @HostBinding('style.display') display = 'flex';
}
