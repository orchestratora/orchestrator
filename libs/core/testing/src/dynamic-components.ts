/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  EventEmitter,
  Input,
  Output,
  Provider,
} from '@angular/core';
import { OrchestratorDynamicComponent } from '@orchestrator/core';

/**
 * In unit tests dynamic components should be registered as in pre-Ivy
 */
export function provideDynamicComponents(comps: any): Provider {
  return {
    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
    useValue: comps,
    multi: true,
  };
}

@Component({ selector: 'orc-dyn-base', template: `` })
export class DynamicBaseComponent implements OrchestratorDynamicComponent {
  @Input() items;
  @Input() config;
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('customEvent') customEvt = new EventEmitter<any>();
}

@Component({
  selector: 'orc-dyn1-comp',
  template: `
    <orc-render-item *ngFor="let item of items" [item]="item"></orc-render-item>
  `,
})
export class Dynamic1Component extends DynamicBaseComponent {}

@Component({ selector: 'orc-dyn2-comp', template: `` })
export class Dynamic2Component extends DynamicBaseComponent {}
