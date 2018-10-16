import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ComponentRef,
} from '@angular/core';
import { OrchestratorConfigItem, OrchestratorDynamicComponentInputs } from '../types';

@Component({
  selector: 'orc-render-item',
  templateUrl: './render-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderItemComponent implements OnInit, OnChanges {
  @Input() item: OrchestratorConfigItem<any>;

  inputs: OrchestratorDynamicComponentInputs = {
    items: undefined,
    config: undefined,
  };

  constructor() {}

  ngOnInit() {
    this.setInputs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('item' in changes) {
      this.setInputs();
    }
  }

  onComponentCreated(compRef: ComponentRef<any>) {}

  private setInputs() {
    this.inputs.items = this.item.items;
    this.inputs.config = this.item.config;
  }
}
