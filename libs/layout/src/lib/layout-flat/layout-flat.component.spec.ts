import { Component, ComponentRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrchestratorConfigItem, OrchestratorCoreModule } from '@orchestrator/core';
import { Dynamic1Component, Dynamic2Component } from '@orchestrator/core/testing';

import { LayoutFlexModule } from '../flex';
import {
  LayoutFlatAlignContentOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatDirectionOptions,
  LayoutFlatJustifyOptions,
  LayoutFlatWrapOptions,
} from '../types';
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
      [wrap]="wrap"
      [direction]="direction"
      [justify]="justify"
      [alignItems]="alignItems"
      [alignContent]="alignContent"
      (afterItemsRendered)="onAfterItemsRendered($event)"
    ></orc-layout-flat>
  `,
})
class HostComponent {
  items: ReadonlyArray<OrchestratorConfigItem<any>>;
  wrap: LayoutFlatWrapOptions;
  direction: LayoutFlatDirectionOptions;
  justify: LayoutFlatJustifyOptions;
  alignItems: LayoutFlatAlignItemsOptions;
  alignContent: LayoutFlatAlignContentOptions;
  onAfterItemsRendered() {}
}

describe('LayoutFlatComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrchestratorCoreModule.withComponents([Dynamic1Component, Dynamic2Component]),
        LayoutFlexModule,
      ],
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

    const layoutElem = getLayoutElem();

    expect(layoutElem.children.length).toBe(2);
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

  describe('@Input(wrap)', () => {
    it('should apply `flex-wrap` style to `.orc-layout-flat`', () => {
      hostComp.wrap = 'wrap-reverse';
      hostFixture.detectChanges();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['flex-wrap']).toBe('wrap-reverse');
    });
  });

  describe('@Input(direction)', () => {
    it('should apply `flex-direction` style to `.orc-layout-flat`', () => {
      hostComp.direction = 'column';
      hostFixture.detectChanges();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['flex-direction']).toBe('column');
    });
  });

  describe('@Input(justify)', () => {
    it('should apply `justify-content` style to `.orc-layout-flat`', () => {
      hostComp.justify = 'space-around';
      hostFixture.detectChanges();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['justify-content']).toBe('space-around');
    });
  });

  describe('@Input(alignItems)', () => {
    it('should apply `align-items` style to `.orc-layout-flat`', () => {
      hostComp.alignItems = 'stretch';
      hostFixture.detectChanges();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['align-items']).toBe('stretch');
    });
  });

  describe('@Input(alignContent)', () => {
    it('should apply `align-content` style to `.orc-layout-flat`', () => {
      hostComp.alignContent = 'flex-end';
      hostFixture.detectChanges();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['align-content']).toBe('flex-end');
    });
  });

  function getLayoutElem(): DebugElement {
    return hostFixture.debugElement.query(By.css('.orc-layout-flat'));
  }
});
