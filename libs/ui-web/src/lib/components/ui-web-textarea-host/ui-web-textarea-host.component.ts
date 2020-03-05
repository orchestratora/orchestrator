import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebTextAreaConfig } from './ui-web-textarea-config';

@Component({
  selector: 'orc-ui-web-textarea-host',
  templateUrl: './ui-web-textarea-host.component.html',
  styleUrls: ['./ui-web-textarea-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebTextAreaConfig })
export class UiWebTextareaHostComponent
  implements OrchestratorDynamicComponent<UiWebTextAreaConfig> {
  @Input() config: UiWebTextAreaConfig;
}
