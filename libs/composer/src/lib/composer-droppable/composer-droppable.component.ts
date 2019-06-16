import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorDynamicComponent,
  OrchestratorDynamicComponentType,
  RenderComponent,
} from '@orchestrator/core';

import { ComposerDroppableConfig } from './composer-droppable-config';

/**
 * @internal
 */
@Component({
  selector: 'orc-composer-droppable',
  templateUrl: './composer-droppable.component.html',
  styleUrls: ['./composer-droppable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: ComposerDroppableConfig })
export class ComposerDroppableComponent
  implements OrchestratorDynamicComponent<ComposerDroppableConfig>, OnChanges {
  constructor(
    private renderComponent: RenderComponent,
    @SkipSelf() @Optional() private parentDroppable: ComposerDroppableComponent,
  ) {}
  static wrapperConfig = Object.freeze<OrchestratorConfigItem>({
    component: ComposerDroppableComponent,
  });

  @Input() config: ComposerDroppableConfig;

  @Input() items: OrchestratorConfigItem[];

  @Output() componentDropped = new EventEmitter<
    OrchestratorDynamicComponentType
  >();

  private droppedConfig: OrchestratorConfigItem;
  private component: OrchestratorDynamicComponentType;
  private compConfig: any;
  private prevItem: OrchestratorConfigItem;

  static wrapComponent<C>(
    comp: OrchestratorDynamicComponentType<C>,
    config?: C,
    items?: OrchestratorConfigItem[],
  ): OrchestratorConfigItem<C> {
    return {
      component: comp,
      config,
      items: items || [ComposerDroppableComponent.wrapperConfig],
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('config' in changes && this.droppedConfig) {
      this.config = {
        ...this.config,
        item: this.droppedConfig,
      };
    }

    if ('items' in changes) {
      this.config = {
        ...this.config,
        item: {
          ...this.config.item,
          items: this.items,
        },
      };
    }
  }

  drop(e: CdkDragDrop<any>) {
    const compType = e.item.data as OrchestratorDynamicComponentType;

    this.compConfig = undefined;
    this.component = compType;

    this.updateItem();

    this.componentDropped.emit(compType);
  }

  replaceItem(item: OrchestratorConfigItem, prevItem?: OrchestratorConfigItem) {
    this.renderComponent.removeItem(ComposerDroppableComponent.wrapperConfig);

    if (prevItem) {
      this.renderComponent.removeItem(prevItem);
    }

    const newItem = ComposerDroppableComponent.wrapComponent(
      ComposerDroppableComponent,
      { item },
    );

    this.renderComponent.addItem(newItem);
    this.renderComponent.addItem(ComposerDroppableComponent.wrapperConfig);

    return newItem;
  }

  configUpdated(compConfig: any) {
    this.compConfig = compConfig;
    this.updateItem();
  }

  private updateItem() {
    const config = ComposerDroppableComponent.wrapComponent(
      this.component,
      this.compConfig,
      this.config ? this.config.item.items : undefined,
    );

    this.droppedConfig = config;

    if (this.parentDroppable) {
      this.prevItem = this.parentDroppable.replaceItem(config, this.prevItem);
    } else {
      this.config = { item: config };
    }
  }
}
