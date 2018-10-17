import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
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
  @Input() item: OrchestratorConfigItem<any>;

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

  onComponentCreated(compRef: ComponentRef<any>) {}

  private updateComponent() {
    this.component = this.componentLocatorService.resolve(this.item.component);
    this.inputs.items = this.item.items;
    this.inputs.config = this.item.config;
  }
}
