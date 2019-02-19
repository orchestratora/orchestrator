import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebTextConfig } from './ui-web-text-config';

@Component({
  selector: 'orc-ui-web-text-host',
  templateUrl: './ui-web-text-host.component.html',
  styleUrls: ['./ui-web-text-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebTextConfig })
export class UiWebTextHostComponent
  implements OrchestratorDynamicComponent<UiWebTextConfig> {
  @Input() config: UiWebTextConfig;
}
