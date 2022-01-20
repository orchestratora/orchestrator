import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebInputConfig } from './ui-web-input-config';

/**
 * @deprecated Use `orc-html-tag` component
 * from `@orchestrator/html-tag` package instead.
 */
@Component({
  selector: 'orc-ui-web-input-host',
  templateUrl: './ui-web-input-host.component.html',
  styleUrls: ['./ui-web-input-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebInputConfig })
export class UiWebInputHostComponent
  implements OrchestratorDynamicComponent<UiWebInputConfig>
{
  @Input() config: UiWebInputConfig;
}
