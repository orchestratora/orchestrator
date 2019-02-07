import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AttributesMap,
  DynamicDirectiveDef,
  dynamicDirectiveDef,
} from 'ng-dynamic-component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ComponentLocatorService } from '../component-locator/component-locator.service';
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

  component: OrchestratorDynamicComponentType;

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

  private compInstance: any;
  private config: any;

  constructor(
    private cdr: ChangeDetectorRef,
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
  }

  onComponentCreated(compRef: ComponentRef<any>) {
    this.compInstance = compRef.instance;
    this.componentCreated.emit(compRef);
    this.componentsRegistryService.add(compRef);
  }

  getInjectorRegistryService() {
    return this.injectorRegistryService;
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
    if (this.item) {
      this.component = this.componentLocatorService.resolve(
        this.item.component,
      );
      this.componentsRegistryService.waitFor(this.itemsLength);
    } else {
      this.component = this.compInstance = null;
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
        ...this.componentLocatorService.getDefaultConfig(this.component),
        ...this.item.config,
      };
    } else {
      this.config = null;
    }
  }

  private updateInputs() {
    if (this.component) {
      this.inputs.items = this.item.items;
      this.inputs.config = this.getConfig();
    } else {
      this.inputs.items = this.inputs.config = null;
    }
  }

  private updateAttributes() {
    if (this.component) {
      this.attributes = this.item.attributes || null;

      if (this.item.id) {
        this.attributes = { ...this.attributes, id: this.item.id };
      }
    }
  }

  private updateDirectives() {
    if (this.component && this.item.classes) {
      this.directives = [
        dynamicDirectiveDef(NgClass, { ngClass: this.item.classes }),
      ];
    } else {
      this.directives = [];
    }
  }

  private getConfig() {
    return this.configurationService.decode(
      this.componentLocatorService.getConfigType(this.component),
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
      getComponent: () => this.compInstance,
      getConfig: () => this.inputs.config,
      isConfigValid: () =>
        this.configurationService
          .validate(
            this.componentLocatorService.getConfigType(this.component),
            this.config,
          )
          .isRight(),
    });
  }
}
