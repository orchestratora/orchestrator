import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  AttributesMap,
  DynamicDirectiveDef,
  dynamicDirectiveDef,
} from 'ng-dynamic-component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ComponentLocatorService } from '../component-locator/component-locator.service';
import { OptionFunction } from '../config';
import { ConfigurationService } from '../config/configuration.service';
import { InjectorRegistryService } from '../injectors/injector-registry.service';
import { LocalInjectorFactory } from '../injectors/local-injector';
import { getStaticInjector } from '../injectors/static-injector';
import { RenderComponent } from '../render-component';
import {
  OrchestratorConfigItem,
  OrchestratorDynamicComponentInputs,
  OrchestratorDynamicComponentType,
} from '../types';
import { ComponentsRegistryService } from './components-registry.service';

class Handler {
  @OptionFunction() handler: Function | string;
}

@Component({
  selector: 'orc-render-item',
  templateUrl: './render-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: RenderComponent, useExisting: RenderItemComponent },
    ComponentsRegistryService,
    InjectorRegistryService,
    LocalInjectorFactory,
  ],
})
export class RenderItemComponent extends RenderComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() item: OrchestratorConfigItem<any> | undefined;

  @Output() componentCreated = new EventEmitter<ComponentRef<any>>();
  @Output() childComponentsCreated = new EventEmitter<ComponentRef<any>[]>();

  destroyed$ = new Subject<void>();

  componentType: OrchestratorDynamicComponentType;

  inputs: OrchestratorDynamicComponentInputs = {
    items: undefined,
    config: undefined,
  };

  directives: DynamicDirectiveDef<any>[] = [];
  attributes: AttributesMap | null = null;

  injector: Injector;

  get itemsLength() {
    return this.item && this.item.items ? this.item.items.length : 0;
  }

  private compRef: ComponentRef<any>;
  private compCdr: ChangeDetectorRef;
  private compFactory: ComponentFactory<any>;
  private config: any;
  private disposableHandlers: Function[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private cfr: ComponentFactoryResolver,
    private componentLocatorService: ComponentLocatorService,
    private componentsRegistryService: ComponentsRegistryService,
    private configurationService: ConfigurationService,
    private localInjectorFactory: LocalInjectorFactory,
    private injectorRegistryService: InjectorRegistryService,
  ) {
    super();
  }

  ngOnInit() {
    this.componentsRegistryService.componentsReady$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(compRefs => {
        this.childComponentsCreated.emit(compRefs);
        this.componentsRegistryService.addChildren(compRefs);
      });

    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('item' in changes) {
      this.update();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.disposeHandlers();
    this.compRef = this.compCdr = this.compFactory = this.config = null;
  }

  onComponentCreated(compRef: ComponentRef<any>) {
    this.compRef = compRef;
    this.compFactory = this.cfr.resolveComponentFactory(compRef.componentType);
    this.componentCreated.emit(compRef);
    this.componentsRegistryService.add(compRef);
    this.updateHandlers();
  }

  getInjectorRegistryService() {
    return this.injectorRegistryService;
  }

  markForCheck() {
    if (!this.compCdr && this.compRef) {
      this.compCdr = this.compRef.injector.get(ChangeDetectorRef);
    }

    if (this.compCdr) {
      this.compCdr.markForCheck();
    }
  }

  addItem(item: OrchestratorConfigItem<any>) {
    if (this.inputs.items) {
      this.inputs.items = [...this.inputs.items, item];
    } else {
      this.inputs.items = [item];
    }

    this.cdr.markForCheck();
  }

  removeItem(item: OrchestratorConfigItem<any>) {
    const idx = this.inputs.items ? this.inputs.items.indexOf(item) : -1;

    if (idx === -1) {
      return;
    }

    this.inputs.items = this.inputs.items.filter((_, i) => i !== idx);

    this.cdr.markForCheck();
  }

  clearItems() {
    this.inputs.items = [];
    this.cdr.markForCheck();
  }

  private update() {
    this.updateComponent();
    this.updateConfig();
    this.updateInjector();
    this.updateInputs();
    this.updateAttributes();
    this.updateDirectives();
  }

  private updateComponent() {
    // Invalidate late-component-refs immediately
    this.compRef = this.compCdr = this.compFactory = null;

    if (this.item) {
      this.componentType = this.componentLocatorService.resolve(
        this.item.component,
      );
      this.componentsRegistryService.waitFor(this.itemsLength);
    } else {
      this.componentType = null;
      this.componentsRegistryService.waitFor(0);
    }
  }

  private updateInjector() {
    if (this.item) {
      this.injector = this.createLocalInjector();
    } else {
      this.injector = this.injectorRegistryService;
    }
  }

  private updateConfig() {
    if (this.item) {
      this.config = {
        ...this.componentLocatorService.getDefaultConfig(this.componentType),
        ...this.item.config,
      };
    } else {
      this.config = null;
    }
  }

  private updateInputs() {
    if (this.componentType) {
      this.inputs.items = this.item.items;
      this.inputs.config = this.getConfig();
    } else {
      this.inputs.items = this.inputs.config = null;
    }
  }

  private updateAttributes() {
    if (this.componentType) {
      this.attributes = this.item.attributes || null;

      if (this.item.id) {
        this.attributes = { ...this.attributes, id: this.item.id };
      }
    }
  }

  private updateDirectives() {
    if (this.componentType && this.item.classes) {
      this.directives = [
        dynamicDirectiveDef(NgClass, { ngClass: this.item.classes }),
      ];
    } else {
      this.directives = [];
    }
  }

  private getConfig() {
    return this.configurationService.decode(
      this.componentLocatorService.getConfigType(this.componentType),
      this.config,
      this.injector,
    );
  }

  private createStaticInjector() {
    return getStaticInjector(this.injectorRegistryService);
  }

  private createLocalInjector() {
    return this.localInjectorFactory.create({
      parentInjector: this.createStaticInjector(),
      getComponent: () => this.compRef.instance,
      getConfig: () => this.inputs.config,
      updateConfig: config => {
        this.markForCheck();
        return (this.inputs.config = { ...this.inputs.config, ...config });
      },
      isConfigValid: () =>
        this.configurationService
          .validate(
            this.componentLocatorService.getConfigType(this.componentType),
            this.config,
          )
          .isRight(),
    });
  }

  private updateHandlers() {
    this.disposeHandlers();

    if (
      !this.item ||
      !this.item.handlers ||
      !this.compRef ||
      !this.compFactory
    ) {
      return;
    }

    const { handlers } = this.item;

    this.disposableHandlers = Object.keys(handlers)
      .map(event => ({
        event,
        handler: this.decodeHandler(handlers[event]),
      }))
      .filter(({ handler }) => handler)
      .map(({ event, handler }) => this.attachHandler(event, handler));
  }

  private decodeHandler(handler: Function | string): Function {
    const fn = this.configurationService.decode(
      Handler,
      { handler },
      this.injector,
    ).handler;
    return typeof fn === 'function' ? fn : null;
  }

  private attachHandler(event: string, handler: Function): Function {
    const outputInfo = this.compFactory.outputs.find(
      output => output.templateName === event,
    );

    if (outputInfo) {
      const output = this.compRef.instance[outputInfo.propName] as Observable<
        any
      >;
      const sub = output.subscribe(handler as any);
      return () => sub.unsubscribe();
    }

    return this.renderer.listen(
      this.compRef.location.nativeElement,
      event,
      handler as any,
    );
  }

  private disposeHandlers() {
    this.disposableHandlers.forEach(disposeHandler => disposeHandler());
    this.disposableHandlers = [];
  }
}
