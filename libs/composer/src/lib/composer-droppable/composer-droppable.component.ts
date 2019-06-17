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
  private compConfig: any;

  static wrapComponent<C>(
    comp: string | OrchestratorDynamicComponentType<C>,
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
      console.log('items update', this.config.component, this.items);
    }
  }

  drop(e: CdkDragDrop<any>) {
    const compType = e.item.data as OrchestratorDynamicComponentType;

    this.config.component = compType;
    this.compConfig = undefined;

    this.updateItem();

    this.componentDropped.emit(compType);
  }

  replaceItem(item: OrchestratorConfigItem, prevItem?: OrchestratorConfigItem) {
    const config: ComposerDroppableConfig = { item, component: item.component };
    const newItem = ComposerDroppableComponent.wrapComponent(
      ComposerDroppableComponent,
      config,
    );
    config.prevItem = newItem;

    if (prevItem) {
      console.log('update', newItem, prevItem);
      this.renderComponent.updateItem(prevItem, newItem);
    } else {
      console.log('add', newItem);
      this.renderComponent.removeItem(ComposerDroppableComponent.wrapperConfig);
      this.renderComponent.addItem(newItem);
      this.renderComponent.addItem(ComposerDroppableComponent.wrapperConfig);
    }

    return newItem;
  }

  configUpdated(compConfig: any) {
    this.compConfig = compConfig;
    this.updateItem(true);
  }

  private updateItem(replaceItem = false) {
    const config = ComposerDroppableComponent.wrapComponent(
      this.config.component,
      this.compConfig,
      this.config ? this.config.item.items : undefined,
    );

    console.log('update item', this.config.component, config);

    this.droppedConfig = config;

    if (this.parentDroppable) {
      this.parentDroppable.replaceItem(
        config,
        replaceItem ? this.config.prevItem : undefined,
      );
    } else {
      this.config = { item: config };
    }
  }
}
