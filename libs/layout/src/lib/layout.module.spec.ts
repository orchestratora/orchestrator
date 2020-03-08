import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  OrchestratorConfigItem,
  OrchestratorCoreModule,
} from '@orchestrator/core';
import {
  Dynamic1Component,
  Dynamic2Component,
} from '@orchestrator/core/testing';

import { LayoutFlatConfig } from './layout-flat-host/layout-flat-config';
import { LayoutFlatHostComponent } from './layout-flat-host/layout-flat-host.component';
import { LayoutFlatComponent } from './layout-flat/layout-flat.component';
import { LayoutModule } from './layout.module';

@Component({
  selector: 'orc-host-comp',
  template: `
    <orc-orchestrator [config]="config"></orc-orchestrator>
  `,
})
class HostComponent {
  config: OrchestratorConfigItem;
}

describe('LayoutModule', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrchestratorCoreModule.withComponents([
          Dynamic1Component,
          Dynamic2Component,
        ]),
        LayoutModule.forRoot(),
      ],
      declarations: [HostComponent, Dynamic1Component, Dynamic2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
  });

  it('should render dynamic components in `layout-flat` component', () => {
    hostComp.config = {
      component: LayoutFlatHostComponent,
      config: { direction: 'column' } as LayoutFlatConfig,
      items: [
        { component: Dynamic1Component },
        { component: Dynamic2Component },
        { component: Dynamic1Component },
      ],
    };

    fixture.detectChanges();

    validateDynamicComponents();
  });

  it('should render dynamic components by strings in `layout-flat` component', () => {
    hostComp.config = {
      component: 'orc-layout-flat-host',
      config: { direction: 'column' } as LayoutFlatConfig,
      items: [
        { component: 'orc-dyn1-comp' },
        { component: 'orc-dyn2-comp' },
        { component: 'orc-dyn1-comp' },
      ],
    };

    fixture.detectChanges();

    validateDynamicComponents();
  });

  function validateDynamicComponents() {
    const layoutHostElem = fixture.debugElement.query(
      By.directive(LayoutFlatHostComponent),
    );

    expect(layoutHostElem).toBeTruthy();

    const layoutElem = layoutHostElem.query(By.directive(LayoutFlatComponent));

    expect(layoutElem).toBeTruthy();
    expect(layoutElem.styles['flex-direction']).toBe('column');

    const dynamic1Components = layoutElem.queryAll(
      By.directive(Dynamic1Component),
    );
    const dynamic2Components = layoutElem.queryAll(
      By.directive(Dynamic2Component),
    );

    expect(dynamic1Components.length).toBe(2);
    expect(dynamic2Components.length).toBe(1);
  }
});
