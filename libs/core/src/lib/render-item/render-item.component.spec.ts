import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicModule } from 'ng-dynamic-component';

import { COMPONENT_MAP } from '../component-map';
import { OrchestratorConfigItem, OrchestratorDynamicComponent } from '../types';
import { RenderItemComponent } from './render-item.component';

@Component({
  selector: 'orc-host-comp',
  template: `<orc-render-item [item]="item"></orc-render-item>`,
})
class HostComponent {
  item: OrchestratorConfigItem<any>;
}

@Component({ selector: 'orc-dyn-base', template: `` })
class DynamicBaseComponent implements OrchestratorDynamicComponent {
  @Input() items;
  @Input() config;
}

@Component({
  selector: 'orc-dyn1-comp',
  template: `<orc-render-item *ngFor="let item of items" [item]="item"></orc-render-item>`,
})
class Dynamic1Component extends DynamicBaseComponent {}

@Component({ selector: 'orc-dyn2-comp', template: `` })
class Dynamic2Component extends DynamicBaseComponent {}

describe('RenderItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicModule.withComponents([Dynamic1Component, Dynamic2Component])],
      declarations: [RenderItemComponent, HostComponent, Dynamic1Component, Dynamic2Component],
      providers: [{ provide: COMPONENT_MAP, useValue: null }],
    }).compileComponents();
  }));

  const init = () => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
  };

  describe('with component types', () => {
    beforeEach(init);

    it('should render top level component', () => {
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();
    });

    it('should render top level component', () => {
      hostComp.item = { component: Dynamic1Component, items: [{ component: Dynamic2Component }] };

      fixture.detectChanges();
    });
  });
});
