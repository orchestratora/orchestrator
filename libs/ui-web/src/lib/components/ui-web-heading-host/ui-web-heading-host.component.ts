import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebHeadingConfig, UiWebHeadingLevel } from './ui-web-heading-config';

/**
 * @deprecated Use `orc-html-tag` component
 * from `@orchestrator/html-tag` package instead.
 */
@Component({
  selector: 'orc-ui-web-heading-host',
  templateUrl: './ui-web-heading-host.component.html',
  styleUrls: ['./ui-web-heading-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebHeadingConfig })
export class UiWebHeadingHostComponent
  implements OrchestratorDynamicComponent<UiWebHeadingConfig>
{
  @Input() config: UiWebHeadingConfig;

  level = UiWebHeadingLevel;
}
