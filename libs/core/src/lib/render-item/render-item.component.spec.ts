import { Component, ComponentRef, InjectionToken, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicModule } from 'ng-dynamic-component';

import { COMPONENT_MAP, ComponentMap } from '../component-map';
import { OrchestratorConfigItem, OrchestratorDynamicComponent } from '../types';
import { RenderItemComponent } from './render-item.component';
import { InjectorRegistryService } from './injector-registry.service';

@Component({
  selector: 'orc-host-comp',
  template: `<orc-render-item
    [item]="item"
    (componentCreated)="onComponentCreated($event)"
    (childComponentsCreated)="onChildComponentsCreated($event)"></orc-render-item>`,
})
class HostComponent {
  item: OrchestratorConfigItem<any>;
  onComponentCreated() {}
  onChildComponentsCreated() {}
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

    it('should not render if item input is not set', () => {
      fixture.detectChanges();

      const comp = fixture.debugElement.query(By.directive(RenderItemComponent));
      expect(comp.childNodes.length).toBe(1);
    });

    it('should render top level component', () => {
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(Dynamic1Component))).toBeTruthy();
    });

    it('should render nested component', () => {
      hostComp.item = { component: Dynamic1Component, items: [{ component: Dynamic2Component }] };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.query(By.directive(Dynamic2Component))).toBeTruthy();
    });

    it('should set `item.items` to dynamic component instance `items` input', () => {
      hostComp.item = { component: Dynamic1Component, items: ['custom-items' as any] };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.componentInstance.items).toEqual(['custom-items']);
    });

    it('should set `item.config` to dynamic component instance `config` input', () => {
      hostComp.item = { component: Dynamic1Component, config: 'custom-config' };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.componentInstance.config).toBe('custom-config');
    });

    it('should update `items` input on dynamic component instance when `item` changes', () => {
      hostComp.item = { component: Dynamic1Component, items: ['custom-items' as any] };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      expect(comp1).toBeTruthy();

      hostComp.item = { ...hostComp.item, items: ['new-items' as any] };
      fixture.detectChanges();

      expect(comp1.componentInstance.items).toEqual(['new-items']);
    });

    it('should update `config` input on dynamic component instance when `item` changes', () => {
      hostComp.item = { component: Dynamic1Component, config: 'custom-config' };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      expect(comp1).toBeTruthy();

      hostComp.item = { ...hostComp.item, config: 'new-config' };
      fixture.detectChanges();

      expect(comp1.componentInstance.config).toEqual('new-config');
    });

    it('should emit `componentCreated` with `ComponentRef` when component instantiated', () => {
      spyOn(hostComp, 'onComponentCreated');
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();

      expect(hostComp.onComponentCreated).toHaveBeenCalledWith(jasmine.any(ComponentRef));
      expect(hostComp.onComponentCreated).toHaveBeenCalledWith(
        jasmine.objectContaining({ instance: jasmine.any(Dynamic1Component) }),
      );
    });

    it('should emit `childComponentsCreated` with `ComponentRef[]` when all components instantiated', () => {
      spyOn(hostComp, 'onChildComponentsCreated');
      hostComp.item = {
        component: Dynamic1Component,
        items: [
          { component: Dynamic1Component, items: [{ component: Dynamic2Component }] },
          { component: Dynamic1Component },
        ],
      };

      fixture.detectChanges();

      expect(hostComp.onChildComponentsCreated).toHaveBeenCalledTimes(1);
      expect(hostComp.onChildComponentsCreated).toHaveBeenCalledWith([
        jasmine.any(ComponentRef),
        jasmine.any(ComponentRef),
        jasmine.any(ComponentRef),
      ]);
      expect(hostComp.onChildComponentsCreated).toHaveBeenCalledWith([
        jasmine.objectContaining({ instance: jasmine.any(Dynamic1Component) }),
        jasmine.objectContaining({ instance: jasmine.any(Dynamic1Component) }),
        jasmine.objectContaining({ instance: jasmine.any(Dynamic2Component) }),
      ]);
    });

    it('should allow customization of injector via InjectorRegistryService.addProviders', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();

      const service = fixture.debugElement
        .query(By.directive(RenderItemComponent))
        .injector.get(InjectorRegistryService);

      expect(service).toBeTruthy();

      const CUSTOM_TOKEN = new InjectionToken('CUSTOM_TOKEN');

      service.addProviders([{ provide: CUSTOM_TOKEN, useValue: 'CUSTOM_VALUE' }]);

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      const comp2 = fixture.debugElement.query(By.directive(Dynamic2Component));

      expect(comp1.injector.get(CUSTOM_TOKEN)).toBe('CUSTOM_VALUE');
      expect(comp2.injector.get(CUSTOM_TOKEN)).toBe('CUSTOM_VALUE');
    });

    it('should allow access to parent tokens', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();

      const service = fixture.debugElement
        .query(By.directive(RenderItemComponent))
        .injector.get(InjectorRegistryService);

      expect(service).toBeTruthy();

      const CUSTOM_TOKEN = new InjectionToken('CUSTOM_TOKEN');

      service.addProviders([{ provide: CUSTOM_TOKEN, useValue: 'CUSTOM_VALUE' }]);

      const itemRenderer = fixture.debugElement.query(By.directive(RenderItemComponent));
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1.injector.get(RenderItemComponent)).toBe(itemRenderer.componentInstance);
    });
  });

  describe('with component strings', () => {
    const componentMap: ComponentMap = {
      dyn1: Dynamic1Component,
      dyn2: Dynamic2Component,
    };

    beforeEach(() => {
      TestBed.overrideProvider(COMPONENT_MAP, { useValue: componentMap });
      init();
    });

    it('should render mapped component', () => {
      hostComp.item = { component: 'dyn1' };

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(Dynamic1Component))).toBeTruthy();
    });

    it('should render nested mapped component', () => {
      hostComp.item = { component: 'dyn1', items: [{ component: 'dyn2' }] };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.query(By.directive(Dynamic2Component))).toBeTruthy();
    });
  });
});
