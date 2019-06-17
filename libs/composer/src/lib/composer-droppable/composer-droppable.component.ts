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
  static wrapperConfig = Object.freeze<OrchestratorConfigItem>({
    component: ComposerDroppableComponent,
  });

  @Input() config: ComposerDroppableConfig;

  @Input() items: OrchestratorConfigItem[];

  @Output() componentDropped = new EventEmitter<
    OrchestratorDynamicComponentType
  >();

  fullConfig: ComposerDroppableConfig;
  private droppedConfig: ComposerDroppableConfig;
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

  constructor(
    private renderComponent: RenderComponent,
    @SkipSelf() @Optional() private parentDroppable: ComposerDroppableComponent,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('config' in changes) {
      // HACK: We need to manually track component changes
      // because Angular will reuse same instance of component in the DOM
      // between different components
      if (
        !changes.config.firstChange &&
        changes.config.currentValue.component !==
          changes.config.previousValue.component
      ) {
        this.reset();
      }

      // Update config only if nothing was dropped into us
      if (!this.droppedConfig) {
        this.fullConfig = this.config;
      }
    }

    // Project items into config for rendering
    if ('items' in changes) {
      this.fullConfig = {
        ...this.fullConfig,
        item: {
          ...this.fullConfig.item,
          items: this.items,
        },
      };
    }
  }

  drop(e: CdkDragDrop<any>) {
    const compType = e.item.data as OrchestratorDynamicComponentType;

    this.fullConfig.component = compType;
    this.compConfig = undefined;

    this.updateItem(true);

    this.componentDropped.emit(compType);
  }

  configUpdated(compConfig: any) {
    this.compConfig = compConfig;
    this.updateItem();
  }

  replaceItem(item: OrchestratorConfigItem, prevItem?: OrchestratorConfigItem) {
    const config: ComposerDroppableConfig = { item, component: item.component };
    const newItem = ComposerDroppableComponent.wrapComponent(
      ComposerDroppableComponent,
      config,
    );
    config.prevItem = newItem;

    if (prevItem) {
      this.renderComponent.updateItem(prevItem, newItem);
    } else {
      this.renderComponent.removeItem(ComposerDroppableComponent.wrapperConfig);
      this.renderComponent.addItem(newItem);
      this.renderComponent.addItem(ComposerDroppableComponent.wrapperConfig);
    }

    return newItem;
  }

  private updateItem(dropped = false) {
    const config = ComposerDroppableComponent.wrapComponent(
      this.fullConfig.component,
      this.compConfig,
      this.fullConfig ? this.fullConfig.item.items : undefined,
    );

    this.fullConfig = { ...this.fullConfig, item: config };

    if (dropped) {
      this.droppedConfig = this.fullConfig;
    }

    if (this.parentDroppable) {
      this.parentDroppable.replaceItem(
        config,
        !dropped ? this.fullConfig.prevItem : undefined,
      );
    }
  }

  // This method is responsible to reset instance state to default
  private reset() {
    this.fullConfig = undefined;
    this.droppedConfig = undefined;
    this.compConfig = undefined;
  }
}
