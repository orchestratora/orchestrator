import { Component, Input } from '@angular/core';
import { OrchestratorDynamicComponent } from '@orchestrator/core';

@Component({ selector: 'orc-dyn-base', template: `` })
export class DynamicBaseComponent implements OrchestratorDynamicComponent {
  @Input() items;
  @Input() config;
}

@Component({
  selector: 'orc-dyn1-comp',
  template: `<orc-render-item *ngFor="let item of items" [item]="item"></orc-render-item>`,
})
export class Dynamic1Component extends DynamicBaseComponent {}

@Component({ selector: 'orc-dyn2-comp', template: `` })
export class Dynamic2Component extends DynamicBaseComponent {}
