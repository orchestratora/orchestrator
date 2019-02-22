import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { StepperConfig } from './stepper-config';

@Component({
  selector: 'orc-stepper-host',
  templateUrl: './stepper-host.component.html',
  styleUrls: ['./stepper-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: StepperConfig })
export class StepperHostComponent
  implements OrchestratorDynamicComponent<StepperConfig> {
  @Input() items: OrchestratorConfigItem[];
  @Input() config: StepperConfig;
}
