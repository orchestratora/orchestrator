import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebButtonConfig } from './ui-web-button-config';

@Component({
  selector: 'orc-ui-web-button-host',
  templateUrl: './ui-web-button-host.component.html',
  styleUrls: ['./ui-web-button-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebButtonConfig })
export class UiWebButtonHostComponent
  implements OrchestratorDynamicComponent<UiWebButtonConfig> {
  @Input() config: UiWebButtonConfig;
}
