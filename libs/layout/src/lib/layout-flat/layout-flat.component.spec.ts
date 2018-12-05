import { Component, ComponentRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrchestratorConfigItem, OrchestratorCoreModule } from '@orchestrator/core';
import { Dynamic1Component, Dynamic2Component } from '@orchestrator/core/testing';

import { LayoutFlexModule } from '../flex';
import { LayoutFlatComponent } from './layout-flat.component';

@Component({
  selector: 'orc-host-comp',
  template: `
    <orc-layout-flat
      [items]="items"
      (afterItemsRendered)="onAfterItemsRendered($event)"
    ></orc-layout-flat>
  `,
})
class HostComponent {
  items: ReadonlyArray<OrchestratorConfigItem<any>>;
  onAfterItemsRendered = jest.fn();
}

describe('LayoutFlatComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrchestratorCoreModule.withComponents([Dynamic1Component, Dynamic2Component]),
        LayoutFlexModule,
      ],
      declarations: [LayoutFlatComponent, HostComponent, Dynamic1Component, Dynamic2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
  });

  it('should have `.layout-flat-orc` class on host', () => {
    fixture.detectChanges();

    const compElem = fixture.debugElement.query(By.directive(LayoutFlatComponent));

    expect(compElem.classes['layout-flat-orc']).toBeTruthy();
  });

  it('should render n amount of items', () => {
    setItemsToHost();
    fixture.detectChanges();

    const compElem = fixture.debugElement.query(By.directive(LayoutFlatComponent));

    expect(compElem.children.length).toBe(2);
  });

  it('should set `.layout-flat-orc-item` class on every item component', () => {
    setItemsToHost();
    fixture.detectChanges();

    const compElem = fixture.debugElement.query(By.directive(LayoutFlatComponent));

    expect(compElem.children.length).toBe(2);
    compElem.children.forEach(child =>
      expect(child.attributes['class']).toBe('layout-flat-orc-item'),
    );
  });

  it('should emit an event after all items are rendered', () => {
    setItemsToHost();
    fixture.detectChanges();

    expect(hostComp.onAfterItemsRendered).toHaveBeenCalledTimes(1);
    expect(hostComp.onAfterItemsRendered).toHaveBeenCalledWith([
      jasmine.any(ComponentRef),
      jasmine.any(ComponentRef),
    ]);
    expect(hostComp.onAfterItemsRendered).toHaveBeenCalledWith([
      jasmine.objectContaining({ instance: jasmine.any(Dynamic1Component) }),
      jasmine.objectContaining({ instance: jasmine.any(Dynamic2Component) }),
    ]);
  });

  function setItemsToHost() {
    hostComp.items = [
      { component: Dynamic1Component },
      { component: Dynamic2Component, items: [{ component: Dynamic1Component }] },
    ];
  }
});
