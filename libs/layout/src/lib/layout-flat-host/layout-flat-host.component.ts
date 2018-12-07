import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { LayoutFlatConfig } from './layout-flat-config';

@Component({
  selector: 'orc-layout-flat-host',
  templateUrl: './layout-flat-host.component.html',
  styleUrls: ['./layout-flat-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
@DynamicComponent({ config: LayoutFlatConfig })
export class LayoutFlatHostComponent implements OrchestratorDynamicComponent<LayoutFlatConfig> {
  @Input() items: OrchestratorConfigItem[];
  @Input() config: LayoutFlatConfig;
}
