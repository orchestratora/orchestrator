import {
  ChangeDetectionStrategy,
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ComponentLocatorService } from '../component-locator/component-locator.service';
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
  providers: [ComponentsRegistryService],
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

  get itemsLength() {
    return this.item && this.item.items ? this.item.items.length : 0;
  }

  constructor(
    private componentLocatorService: ComponentLocatorService,
    private componentsRegistryService: ComponentsRegistryService,
  ) {}

  ngOnInit() {
    this.componentsRegistryService.componentsReady$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(compRefs => {
        this.childComponentsCreated.emit(compRefs);
        this.componentsRegistryService.addChildren(compRefs);
      });

    this.updateComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('item' in changes) {
      this.updateComponent();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onComponentCreated(compRef: ComponentRef<any>) {
    this.componentCreated.emit(compRef);
    this.componentsRegistryService.add(compRef);
  }

  private updateComponent() {
    if (this.item) {
      this.component = this.componentLocatorService.resolve(this.item.component);
      this.inputs.items = this.item.items;
      this.inputs.config = this.item.config;

      this.componentsRegistryService.waitFor(this.itemsLength);
    } else {
      this.component = this.inputs.items = this.inputs.config = null;

      this.componentsRegistryService.waitFor(0);
    }
  }
}
