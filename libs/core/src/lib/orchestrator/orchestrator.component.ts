import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { OrchestratorConfigItem } from '../types';

@Component({
  selector: 'orc-orchestrator',
  templateUrl: './orchestrator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrchestratorComponent implements OnInit {
  @Input() config: OrchestratorConfigItem<any>;

  constructor() {}

  ngOnInit() {}
}
