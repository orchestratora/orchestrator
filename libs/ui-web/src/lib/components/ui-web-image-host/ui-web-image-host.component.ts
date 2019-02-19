import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebImageConfig } from './ui-web-image-config';

@Component({
  selector: 'orc-ui-web-image-host',
  templateUrl: './ui-web-image-host.component.html',
  styleUrls: ['./ui-web-image-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebImageConfig })
export class UiWebImageHostComponent
  implements OrchestratorDynamicComponent<UiWebImageConfig> {
  @Input() config: UiWebImageConfig;
}
