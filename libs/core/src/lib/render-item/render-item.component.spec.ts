import { Component, ComponentRef, InjectionToken } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dynamic1Component, Dynamic2Component } from '@testing';
import { DynamicModule } from 'ng-dynamic-component';

import { ComponentLocatorService } from '../component-locator/component-locator.service';
import { ComponentMap, COMPONENTS } from '../component-map';
import { ConfigurationService } from '../config/configuration.service';
import { ErrorStrategy } from '../error-strategy/error-strategy';
import { SuppressErrorStrategy } from '../error-strategy/suppress-error-strategy';
import { ThrowErrorStrategy } from '../error-strategy/throw-error-strategy';
import { INJECTOR_MAP_TOKEN } from '../injectors/local-injector';
import { RenderComponent } from '../render-component';
import { OrchestratorConfigItem } from '../types';
import { RenderItemComponent } from './render-item.component';

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

describe('RenderItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicModule.withComponents([Dynamic1Component, Dynamic2Component]),
      ],
      declarations: [
        RenderItemComponent,
        HostComponent,
        Dynamic1Component,
        Dynamic2Component,
      ],
      providers: [
        { provide: COMPONENTS, useValue: null, multi: true },
        ComponentLocatorService,
        ConfigurationService,
        { provide: ErrorStrategy, useClass: SuppressErrorStrategy },
        { provide: INJECTOR_MAP_TOKEN, useValue: {} },
      ],
    });
  }));

  const init = async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HostComponent);
      hostComp = fixture.componentInstance;
    });
  });

  describe('with component types', () => {
    beforeEach(init);

    it('should not render if item input is not set', () => {
      fixture.detectChanges();

      const comp = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      );
      expect(comp.childNodes.length).toBe(1);
    });

    it('should render top level component', () => {
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.directive(Dynamic1Component)),
      ).toBeTruthy();
    });

    it('should render nested component', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.query(By.directive(Dynamic2Component))).toBeTruthy();
    });

    it('should set `item.items` to dynamic component instance `items` input', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: ['custom-items' as any],
      };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.componentInstance.items).toEqual(['custom-items']);
    });

    it('should set `item.config` to dynamic component instance `config` input', () => {
      const config = { myConfig: true };
      hostComp.item = { component: Dynamic1Component, config: config };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.componentInstance.config).toEqual(config);
    });

    it('should set attributes on dynamic component from `item.attributes`', () => {
      hostComp.item = {
        component: Dynamic1Component,
        attributes: { 'my-attr': 'val', class: 'my-class' },
      };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.nativeElement.getAttribute('my-attr')).toBe('val');
      expect(comp1.nativeElement.getAttribute('class')).toBe('my-class');
    });

    it('should merge `item.config` with `ComponentLocatorService.getDefaultConfig`', () => {
      const configDefault = { default: true, myConfig: false };
      const config = { myConfig: true };
      const finalConfig = { default: true, myConfig: true };

      const cls = TestBed.get(
        ComponentLocatorService,
      ) as ComponentLocatorService;
      spyOn(cls, 'getDefaultConfig').and.returnValue(configDefault);
      hostComp.item = { component: Dynamic1Component, config: config };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.componentInstance.config).toEqual(finalConfig);
    });

    it('should update `items` input on dynamic component instance when `item` changes', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: ['custom-items' as any],
      };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      expect(comp1).toBeTruthy();

      hostComp.item = { ...hostComp.item, items: ['new-items' as any] };
      fixture.detectChanges();

      expect(comp1.componentInstance.items).toEqual(['new-items']);
    });

    it('should update `config` input on dynamic component instance when `item` changes', () => {
      const config1 = { myConfig: true };
      hostComp.item = { component: Dynamic1Component, config: config1 };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      expect(comp1).toBeTruthy();

      const config2 = { myNewConfig: true };
      hostComp.item = { ...hostComp.item, config: config2 };
      fixture.detectChanges();

      expect(comp1.componentInstance.config).toEqual(config2);
    });

    it('should emit `componentCreated` with `ComponentRef` when component instantiated', () => {
      spyOn(hostComp, 'onComponentCreated');
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();

      expect(hostComp.onComponentCreated).toHaveBeenCalledWith(
        jasmine.any(ComponentRef),
      );
      expect(hostComp.onComponentCreated).toHaveBeenCalledWith(
        jasmine.objectContaining({ instance: jasmine.any(Dynamic1Component) }),
      );
    });

    it('should emit `childComponentsCreated` with `ComponentRef[]` when all components instantiated', () => {
      spyOn(hostComp, 'onChildComponentsCreated');
      hostComp.item = {
        component: Dynamic1Component,
        items: [
          {
            component: Dynamic1Component,
            items: [{ component: Dynamic2Component }],
          },
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

    it('should allow customization of injector via getInjectorRegistryService().addProviders()', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();

      const renderItem = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      ).componentInstance as RenderItemComponent;

      expect(renderItem).toBeTruthy();

      const service = renderItem.getInjectorRegistryService();

      expect(service).toBeTruthy();

      const CUSTOM_TOKEN = new InjectionToken('CUSTOM_TOKEN');

      service.addProviders([
        { provide: CUSTOM_TOKEN, useValue: 'CUSTOM_VALUE' },
      ]);

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

      const renderItem = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      ).componentInstance as RenderItemComponent;

      expect(renderItem).toBeTruthy();

      const service = renderItem.getInjectorRegistryService();

      expect(service).toBeTruthy();

      const CUSTOM_TOKEN = new InjectionToken('CUSTOM_TOKEN');

      service.addProviders([
        { provide: CUSTOM_TOKEN, useValue: 'CUSTOM_VALUE' },
      ]);

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1.injector.get(RenderItemComponent)).toBe(renderItem);
    });

    it('should re-render items on change', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [],
      };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      hostComp.item = {
        ...hostComp.item,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();

      const comp2 = comp1.query(By.directive(Dynamic2Component));

      expect(comp2).toBeTruthy();
      expect(comp2.componentInstance).toEqual(jasmine.any(Dynamic2Component));
    });

    it('should provide itself under `RenderComponent` token', () => {
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();

      const renderItemElem = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      );

      const renderComp = renderItemElem.injector.get(RenderComponent);

      expect(renderComp).toBe(renderItemElem.componentInstance);
    });
  });

  describe('item.id', () => {
    beforeEach(init);

    it('should set `id` attribute on dynamic component', () => {
      hostComp.item = { component: Dynamic1Component, id: 'my-id' };

      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp).toBeTruthy();
      expect(comp.nativeElement.getAttribute('id')).toBe('my-id');
    });

    it('should merge `id` with `config.attributes` and set on dynamic component', () => {
      hostComp.item = {
        component: Dynamic1Component,
        id: 'my-id',
        attributes: { 'my-attr': 'val' },
      };

      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp).toBeTruthy();
      expect(comp.nativeElement.getAttribute('id')).toBe('my-id');
      expect(comp.nativeElement.getAttribute('my-attr')).toBe('val');
    });

    it('should override id from `config.attributes`', () => {
      hostComp.item = {
        component: Dynamic1Component,
        id: 'from-id',
        attributes: { id: 'from-attrs' },
      };

      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp).toBeTruthy();
      expect(comp.nativeElement.getAttribute('id')).toBe('from-id');
    });
  });

  describe('item.classes', () => {
    beforeEach(init);

    describe('when string', () => {
      it('should set class on dynamic component', () => {
        hostComp.item = {
          component: Dynamic1Component,
          classes: 'class1 class2',
        };

        fixture.detectChanges();
        const comp = fixture.debugElement.query(
          By.directive(Dynamic1Component),
        );

        expect(comp).toBeTruthy();
        expect(comp.nativeElement.getAttribute('class')).toBe('class1 class2');
      });
    });

    describe('when array of strings', () => {
      it('should set classes on dynamic component', () => {
        hostComp.item = {
          component: Dynamic1Component,
          classes: ['class1', 'class2'],
        };

        fixture.detectChanges();
        const comp = fixture.debugElement.query(
          By.directive(Dynamic1Component),
        );

        expect(comp).toBeTruthy();
        expect(comp.nativeElement.getAttribute('class')).toBe('class1 class2');
      });
    });

    describe('when map of booleans', () => {
      it('should set classes with `true` on dynamic component', () => {
        hostComp.item = {
          component: Dynamic1Component,
          classes: { class1: false, class2: true },
        };

        fixture.detectChanges();
        const comp = fixture.debugElement.query(
          By.directive(Dynamic1Component),
        );

        expect(comp).toBeTruthy();
        expect(comp.nativeElement.getAttribute('class')).toBe('class2');
      });
    });
  });

  describe('item.handlers', () => {
    beforeEach(done => {
      TestBed.configureTestingModule({
        providers: [{ provide: ErrorStrategy, useClass: ThrowErrorStrategy }],
      });
      init(done);
    });

    it('should attach listener to host element events', () => {
      const clickFn = (window['clickFn'] = jest.fn());

      hostComp.item = {
        component: Dynamic1Component,
        handlers: {
          click: $event => window['clickFn']($event),
        },
      };

      fixture.detectChanges();

      const compElem = fixture.debugElement.query(
        By.directive(Dynamic1Component),
      );

      expect(compElem).toBeTruthy();

      const clickEvt = {};
      compElem.triggerEventHandler('click', clickEvt);

      expect(clickFn).toHaveBeenCalledWith(clickEvt);
    });

    it('should attach listener to host element outputs', () => {
      const customFn = (window['customFn'] = jest.fn());

      hostComp.item = {
        component: Dynamic1Component,
        handlers: {
          customEvent: $event => window['customFn']($event),
        },
      };

      fixture.detectChanges();

      const compElem = fixture.debugElement.query(
        By.directive(Dynamic1Component),
      );
      expect(compElem).toBeTruthy();
      const comp = compElem.componentInstance as Dynamic1Component;

      const customEvt = {};
      comp.customEvt.emit(customEvt);

      expect(customFn).toHaveBeenCalledWith(customEvt);
    });
  });

  describe('with component strings', () => {
    const componentMap: ComponentMap = {
      dyn1: Dynamic1Component,
      dyn2: Dynamic2Component,
    };

    beforeEach(done => {
      TestBed.configureTestingModule({
        providers: [
          { provide: COMPONENTS, useValue: componentMap, multi: true },
        ],
      });
      init(done);
    });

    it('should render mapped component', () => {
      hostComp.item = { component: 'dyn1' };

      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.directive(Dynamic1Component)),
      ).toBeTruthy();
    });

    it('should render nested mapped component', () => {
      hostComp.item = { component: 'dyn1', items: [{ component: 'dyn2' }] };

      fixture.detectChanges();
      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp1).toBeTruthy();
      expect(comp1.query(By.directive(Dynamic2Component))).toBeTruthy();
    });
  });

  describe('addItem() method', () => {
    beforeEach(init);

    it('should add new item and render it', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [],
      };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      const renderItem = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      );

      renderItem.componentInstance.addItem({ component: Dynamic2Component });

      fixture.detectChanges();

      const comp2 = comp1.query(By.directive(Dynamic2Component));

      expect(comp2).toBeTruthy();
      expect(comp2.componentInstance).toEqual(jasmine.any(Dynamic2Component));
    });
  });

  describe('removeItem() method', () => {
    beforeEach(init);

    it('should remove item and render it', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      const renderItem = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      );

      renderItem.componentInstance.removeItem(hostComp.item.items[0]);

      fixture.detectChanges();

      const comp2 = comp1.query(By.directive(Dynamic2Component));

      expect(comp2).toBeNull();
    });
  });

  describe('clearItems() method', () => {
    beforeEach(init);

    it('should remove all items and render none', () => {
      hostComp.item = {
        component: Dynamic1Component,
        items: [{ component: Dynamic2Component }],
      };

      fixture.detectChanges();

      const comp1 = fixture.debugElement.query(By.directive(Dynamic1Component));
      const renderItem = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      ).componentInstance as RenderItemComponent;

      expect(comp1.query(By.directive(Dynamic2Component))).toBeTruthy();

      renderItem.clearItems();
      fixture.detectChanges();

      expect(comp1.query(By.directive(Dynamic2Component))).toBeFalsy();
      expect(comp1.children.length).toBe(0);
    });
  });
});
