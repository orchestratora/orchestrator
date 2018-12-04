import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { OrchestratorConfigItem, OrchestratorDynamicComponent } from '@orchestrator/core';

import { LayoutFlatConfig } from './layout-flat-config';

@Component({
  selector: 'orc-layout-flat-host',
  templateUrl: './layout-flat-host.component.html',
  styleUrls: ['./layout-flat-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LayoutFlatHostComponent
  implements OnInit, OnChanges, OrchestratorDynamicComponent<LayoutFlatConfig> {
  @Input() items: OrchestratorConfigItem[];
  @Input() config: LayoutFlatConfig;

  mergedConfig: LayoutFlatConfig;

  constructor(@Optional() private defaultConfig: LayoutFlatConfig) {}

  ngOnInit(): void {
    this.mergeConfigs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) {
      this.mergeConfigs();
    }
  }

  private mergeConfigs() {
    this.mergedConfig = LayoutFlatConfig.merge(this.defaultConfig, this.config);
  }
}
