import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { ControlConfigComponent } from '../types';
import { RangeConfigExtras } from '../config/range';

@Component({
  selector: 'orc-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegerComponent
  implements ControlConfigComponent<RangeConfigExtras> {
  @Input() name: string;
  @Input() parent: ControlContainer;
  @Input() extras: RangeConfigExtras;
}
