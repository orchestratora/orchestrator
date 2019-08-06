import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { ControlConfigComponent } from '../types';

export interface AllowedValuesExtras {
  options: string[];
}

@Component({
  selector: 'orc-allowed-values',
  templateUrl: './allowed-values.component.html',
  styleUrls: ['./allowed-values.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllowedValuesComponent
  implements ControlConfigComponent<AllowedValuesExtras> {
  @Input() name: string;
  @Input() parent: ControlContainer;
  @Input() extras: AllowedValuesExtras;
}
