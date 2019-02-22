import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { StepConfig } from './step-config';

@Component({
  selector: 'orc-step-host',
  templateUrl: './step-host.component.html',
  styleUrls: ['./step-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: StepConfig })
export class StepHostComponent
  implements OrchestratorDynamicComponent<StepConfig> {
  @Input() items: OrchestratorConfigItem<any>[];

  @Input() config: StepConfig;

  get step() {
    return this.items ? this.items[0] : null;
  }
}
