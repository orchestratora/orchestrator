import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { RangeConfigExtras } from '../config/range';
import { ControlConfigComponent } from '../types';

@Component({
  selector: 'orc-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent
  implements ControlConfigComponent<RangeConfigExtras> {
  @Input() name: string;
  @Input() parent: ControlContainer;
  @Input() extras: RangeConfigExtras;
}
