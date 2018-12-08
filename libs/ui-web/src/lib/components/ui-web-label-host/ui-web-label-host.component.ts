import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicComponent, OrchestratorDynamicComponent } from '@orchestrator/core';

import { UiWebLabelConfig } from './ui-web-label-config';

@Component({
  selector: 'orc-ui-web-label-host',
  templateUrl: './ui-web-label-host.component.html',
  styleUrls: ['./ui-web-label-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebLabelConfig })
export class UiWebLabelHostComponent implements OrchestratorDynamicComponent<UiWebLabelConfig> {
  @Input() config: UiWebLabelConfig;
}
