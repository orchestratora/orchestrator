import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  InjectionToken,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Dynamic1Component,
  Dynamic2Component,
  provideDynamicComponents,
} from '@orchestrator/core/testing';
import {
  DynamicAttributesModule,
  DynamicModule,
  DynamicDirectivesModule,
} from 'ng-dynamic-component';
import { ComponentLocatorService } from '../component-locator/component-locator.service';
import { COMPONENTS } from '../components-token';
import { ComponentMap } from '../component-registry';
import { Option } from '../config';
import { ConfigurationService } from '../config/configuration.service';
import { ErrorStrategy } from '../error-strategy/error-strategy';
import { SuppressErrorStrategy } from '../error-strategy/suppress-error-strategy';
import { ThrowErrorStrategy } from '../error-strategy/throw-error-strategy';
import { InjectorRegistryService } from '../injectors/injector-registry.service';
import * as localInjector from '../injectors/local-injector';
import { LocalInjectorParams } from '../injectors/local-injector';
import {
  MappedInjectorFactory,
  provideInjectorMap,
} from '../injectors/mapped-injector';
import { RenderComponent } from '../render-component';
import { OrchestratorConfigItem } from '../types';
import { RenderItemComponent } from './render-item.component';

@Component({
  selector: 'orc-host-comp',
  template: `
    <orc-render-item
      [item]="item"
      [context]="context"
      (componentCreated)="onComponentCreated($event)"
      (childComponentsCreated)="onChildComponentsCreated($event)"
    ></orc-render-item>
  `,
})
class HostComponent {
  item: OrchestratorConfigItem<any>;
  context: any;
  onComponentCreated = jest.fn();
  onChildComponentsCreated = jest.fn();
}

describe('RenderItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicModule,
        DynamicAttributesModule,
        DynamicDirectivesModule,
      ],
      declarations: [
        RenderItemComponent,
        HostComponent,
        Dynamic1Component,
        Dynamic2Component,
      ],
      providers: [
        provideDynamicComponents([Dynamic1Component, Dynamic2Component]),
        { provide: COMPONENTS, useValue: null, multi: true },
        ComponentLocatorService,
        ConfigurationService,
        { provide: ErrorStrategy, useClass: SuppressErrorStrategy },
        provideInjectorMap({}),
      ],
      teardown: { destroyAfterEach: false },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const init = async () => {
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
  };

  describe('with component types', () => {
    beforeEach(waitForAsync(init));

    it('should not render if item input is not set', () => {
      fixture.detectChanges();

      const comp = fixture.debugElement.query(
        By.directive(RenderItemComponent),
      );

      expect(comp.children.length).toBe(1);
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

      const cls = TestBed.inject(ComponentLocatorService);
      jest.spyOn(cls, 'getDefaultConfig').mockReturnValue(configDefault);
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
      hostComp.item = { component: Dynamic1Component };

      fixture.detectChanges();

      expect(hostComp.onComponentCreated).toHaveBeenCalledWith(
        expect.any(ComponentRef),
      );
      expect(hostComp.onComponentCreated).toHaveBeenCalledWith(
        expect.objectContaining({ instance: expect.any(Dynamic1Component) }),
      );
    });

    it('should emit `childComponentsCreated` with `ComponentRef[]` when all components instantiated', () => {
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
        expect.any(ComponentRef),
        expect.any(ComponentRef),
        expect.any(ComponentRef),
      ]);
      expect(hostComp.onChildComponentsCreated).toHaveBeenCalledWith([
        expect.objectContaining({ instance: expect.any(Dynamic1Component) }),
        expect.objectContaining({ instance: expect.any(Dynamic1Component) }),
        expect.objectContaining({ instance: expect.any(Dynamic2Component) }),
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
      expect(comp2.componentInstance).toEqual(expect.any(Dynamic2Component));
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

  describe('context', () => {
    beforeEach(waitForAsync(init));

    it('should be passed to dynamic component', () => {
      hostComp.item = { component: Dynamic1Component };
      hostComp.context = { ctx: true };

      fixture.detectChanges();

      const comp = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp).toBeTruthy();
      expect(comp.componentInstance.context).toBe(hostComp.context);
    });

    it('should re-render dynamic component when updated', () => {
      hostComp.item = { component: Dynamic1Component };
      hostComp.context = {};

      fixture.detectChanges();

      const comp = fixture.debugElement.query(By.directive(Dynamic1Component));

      expect(comp).toBeTruthy();
      expect(comp.componentInstance.context).toEqual({});

      hostComp.context = { updated: true };
      fixture.detectChanges();

      expect(comp.componentInstance.context).toEqual({ updated: true });
    });
  });

  describe('item.id', () => {
    beforeEach(waitForAsync(init));

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
    beforeEach(waitForAsync(init));

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
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          providers: [{ provide: ErrorStrategy, useClass: ThrowErrorStrategy }],
          teardown: { destroyAfterEach: false },
        });
        init();
      }),
    );

    it('should attach listener to host element events', () => {
      const clickFn = (window['clickFn'] = jest.fn());

      hostComp.item = {
        component: Dynamic1Component,
        handlers: {
          click: ($event) => window['clickFn']($event),
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
          customEvent: ($event) => window['customFn']($event),
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

  describe('injector', () => {
    describe('mapped', () => {
      beforeEach(waitForAsync(init));

      it('should use local injector as parent', () => {
        const createLocalInjector = jest.spyOn(
          localInjector,
          'createLocalInjector',
        );

        const compElem = fixture.debugElement.query(
          By.directive(RenderItemComponent),
        );

        expect(compElem).toBeTruthy();

        const mappedInjectorFactory = compElem.injector.get(
          MappedInjectorFactory,
        );

        jest.spyOn(mappedInjectorFactory, 'create');

        hostComp.item = { component: Dynamic1Component };

        fixture.detectChanges();

        const localInjectorValue = createLocalInjector.mock.results[0].value;

        expect(createLocalInjector).toHaveBeenCalledTimes(1);
        expect(mappedInjectorFactory.create).toHaveBeenCalledWith(
          localInjectorValue,
        );
      });
    });

    describe('local', () => {
      let createLocalInjector: jest.SpyInstance;

      beforeEach(waitForAsync(init));

      beforeEach(() => {
        const injector = fixture.debugElement.query(
          By.directive(RenderItemComponent),
        ).injector;

        createLocalInjector = jest
          .spyOn(localInjector, 'createLocalInjector')
          .mockReturnValue(injector);
      });

      describe('parentInjector prop', () => {
        it('should be `InjectorRegistryService`', () => {
          hostComp.item = { component: Dynamic1Component };

          fixture.detectChanges();

          expect(createLocalInjector).toHaveBeenCalledWith(
            expect.objectContaining({
              parentInjector: expect.any(InjectorRegistryService),
            }),
          );
        });
      });

      describe('getComponent prop', () => {
        it('should return dynamic component', () => {
          hostComp.item = { component: Dynamic1Component };

          fixture.detectChanges();

          const compElem = fixture.debugElement.query(
            By.directive(Dynamic1Component),
          );

          expect(compElem).toBeTruthy();
          expect(createLocalInjector).toHaveBeenCalled();

          const { getComponent } = createLocalInjector.mock
            .calls[0][0] as LocalInjectorParams;

          expect(getComponent).toEqual(expect.any(Function));
          expect(getComponent()).toBe(compElem.componentInstance);
        });
      });

      describe('getConfig prop', () => {
        it('should return component`s configuration', () => {
          const config = { isConfig: true };
          hostComp.item = { component: Dynamic1Component, config };

          fixture.detectChanges();

          expect(createLocalInjector).toHaveBeenCalled();

          const { getConfig } = createLocalInjector.mock
            .calls[0][0] as LocalInjectorParams;

          expect(getConfig).toEqual(expect.any(Function));
          expect(getConfig()).toEqual(config);
        });
      });

      describe('updateConfig prop', () => {
        it('should update component`s configuration and return it', () => {
          const config = { isConfig: true };
          hostComp.item = { component: Dynamic1Component, config };

          fixture.detectChanges();

          expect(createLocalInjector).toHaveBeenCalled();

          const { updateConfig } = createLocalInjector.mock
            .calls[0][0] as LocalInjectorParams;

          expect(updateConfig).toEqual(expect.any(Function));
          expect(updateConfig({ isConfig: false })).toEqual({
            isConfig: false,
          });
        });

        it('should markForCheck dynamic component', () => {
          hostComp.item = { component: Dynamic1Component };

          fixture.detectChanges();

          const compElem = fixture.debugElement.query(
            By.directive(Dynamic1Component),
          );

          expect(compElem).toBeTruthy();

          const renderItemElem = fixture.debugElement.query(
            By.directive(RenderItemComponent),
          );

          expect(renderItemElem).toBeTruthy();

          const renderItem =
            renderItemElem.componentInstance as RenderItemComponent;

          const markForCheck = jest.fn();
          const injectorGet = jest.fn().mockReturnValue({ markForCheck });

          renderItem.onComponentCreated({
            injector: { get: injectorGet },
          } as any);

          expect(createLocalInjector).toHaveBeenCalled();

          const { updateConfig } = createLocalInjector.mock
            .calls[0][0] as LocalInjectorParams;

          updateConfig({});

          expect(injectorGet).toHaveBeenCalledWith(ChangeDetectorRef);
          expect(markForCheck).toHaveBeenCalled();
        });
      });

      describe('isConfigValid prop', () => {
        beforeEach(() => {
          class Config {
            @Option() prop: string;
          }

          const compLocator = TestBed.inject(ComponentLocatorService);
          jest.spyOn(compLocator, 'getConfigType').mockReturnValue(Config);
        });

        it('should return `true` when config valid', () => {
          hostComp.item = {
            component: Dynamic1Component,
            config: { prop: 'ok' },
          };

          fixture.detectChanges();

          expect(createLocalInjector).toHaveBeenCalled();

          const { isConfigValid } = createLocalInjector.mock
            .calls[0][0] as LocalInjectorParams;

          expect(isConfigValid).toEqual(expect.any(Function));
          expect(isConfigValid()).toBe(true);
        });

        it('should return `false` when config invalid', () => {
          hostComp.item = {
            component: Dynamic1Component,
            config: { prop: 1 },
          };

          fixture.detectChanges();

          expect(createLocalInjector).toHaveBeenCalled();

          const { isConfigValid } = createLocalInjector.mock
            .calls[0][0] as LocalInjectorParams;

          expect(isConfigValid).toEqual(expect.any(Function));
          expect(isConfigValid()).toBe(false);
        });
      });
    });
  });

  describe('with component strings', () => {
    const componentMap: ComponentMap = {
      dyn1: Dynamic1Component,
      dyn2: Dynamic2Component,
    };

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: COMPONENTS, useValue: componentMap, multi: true },
          ],
          teardown: { destroyAfterEach: false },
        });
        init();
      }),
    );

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
    beforeEach(waitForAsync(init));

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
      expect(comp2.componentInstance).toEqual(expect.any(Dynamic2Component));
    });
  });

  describe('removeItem() method', () => {
    beforeEach(waitForAsync(init));

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
    beforeEach(waitForAsync(init));

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
