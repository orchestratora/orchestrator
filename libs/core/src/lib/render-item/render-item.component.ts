import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ComponentLocatorService } from '../component-locator/component-locator.service';
import {
  OrchestratorConfigItem,
  OrchestratorDynamicComponentInputs,
  OrchestratorDynamicComponentType,
} from '../types';

@Component({
  selector: 'orc-render-item',
  templateUrl: './render-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderItemComponent implements OnInit, OnChanges {
  @Input() item: OrchestratorConfigItem<any> | undefined;

  @Output() componentCreated = new EventEmitter<ComponentRef<any>>();

  component: OrchestratorDynamicComponentType;

  inputs: OrchestratorDynamicComponentInputs = {
    items: undefined,
    config: undefined,
  };

  constructor(private componentLocatorService: ComponentLocatorService) {}

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('item' in changes) {
      this.updateComponent();
    }
  }

  onComponentCreated(compRef: ComponentRef<any>) {
    this.componentCreated.emit(compRef);
  }

  private updateComponent() {
    if (this.item) {
      this.component = this.componentLocatorService.resolve(this.item.component);
      this.inputs.items = this.item.items;
      this.inputs.config = this.item.config;
    } else {
      this.component = this.inputs.items = this.inputs.config = null;
    }
  }
}
