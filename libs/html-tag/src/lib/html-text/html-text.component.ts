import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';
import { HtmlTextConfig } from './html-text-config';

@Component({
  selector: 'orc-html-text',
  templateUrl: './html-text.component.html',
  styleUrls: ['./html-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: HtmlTextConfig })
export class HtmlTextComponent
  implements OrchestratorDynamicComponent<HtmlTextConfig>
{
  @Input() config?: HtmlTextConfig;
}
