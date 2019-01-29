import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
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
import {
  OrchestratorConfigItem,
  OrchestratorDynamicComponentInputs,
  OrchestratorDynamicComponentType,
} from '../types';
import { ComponentsRegistryService } from './components-registry.service';
import { InjectorRegistryService } from './injector-registry.service';

@Component({
  selector: 'orc-render-item',
  templateUrl: './render-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComponentsRegistryService, InjectorRegistryService],
})
export class RenderItemComponent implements OnInit, OnChanges, OnDestroy {
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

  get itemsLength() {
    return this.item && this.item.items ? this.item.items.length : 0;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private componentLocatorService: ComponentLocatorService,
    private componentsRegistryService: ComponentsRegistryService,
    private configurationService: ConfigurationService,
    public injectorRegistryService: InjectorRegistryService,
  ) {}

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
    this.componentCreated.emit(compRef);
    this.componentsRegistryService.add(compRef);
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
      this.component = null;
      this.componentsRegistryService.waitFor(0);
    }
  }

  private updateInputs() {
    if (this.component) {
      this.inputs.items = this.item.items;
      this.inputs.config = this.configurationService.decode(
        this.componentLocatorService.getConfigType(this.component),
        {
          ...this.componentLocatorService.getDefaultConfig(this.component),
          ...this.item.config,
        },
      );
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
}
