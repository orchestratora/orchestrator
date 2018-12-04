import { Component, ComponentRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrchestratorConfigItem, OrchestratorCoreModule } from '@orchestrator/core';
import { Dynamic1Component, Dynamic2Component } from '@orchestrator/core/testing';

import { LayoutFlatComponent } from './layout-flat.component';

let hostComp: HostComponent;
let hostFixture: ComponentFixture<HostComponent>;

const setItemsToHost = () => {
  hostComp.items = [
    { component: Dynamic1Component },
    { component: Dynamic2Component, items: [{ component: Dynamic1Component }] },
  ];
};

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
  onAfterItemsRendered() {}
}

describe('LayoutFlatComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrchestratorCoreModule.withComponents([Dynamic1Component, Dynamic2Component])],
      declarations: [HostComponent, LayoutFlatComponent, Dynamic1Component, Dynamic2Component],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostComponent);
    hostComp = hostFixture.componentInstance;
  });

  it('should render n amount of items', () => {
    setItemsToHost();
    hostFixture.detectChanges();
    const sectionElement = hostFixture.debugElement.query(By.css('section'));

    expect(sectionElement.children.length).toBe(2);
  });

  it('should apply the correct default styles to the wrapper', () => {
    setItemsToHost();
    hostFixture.detectChanges();
    const sectionElement = hostFixture.debugElement.query(By.css('section'));

    expect(sectionElement.classes['layout-flex__wrap']).toBeTruthy();
    expect(sectionElement.classes['layout-flex__row']).toBeTruthy();
    expect(sectionElement.classes['layout-flex__justify-content-space-between']).toBeTruthy();
    expect(sectionElement.classes['layout-flex__align-items-center']).toBeTruthy();
  });

  it('should emit an event after all items are rendered', () => {
    spyOn(hostComp, 'onAfterItemsRendered');
    setItemsToHost();
    hostFixture.detectChanges();

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
});
