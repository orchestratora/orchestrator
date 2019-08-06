import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { ControlConfigComponent } from '../types';

@Component({
  selector: 'orc-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent implements ControlConfigComponent {
  @Input() name: string;
  @Input() parent: ControlContainer;
}
