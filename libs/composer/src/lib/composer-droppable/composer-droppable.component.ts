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

  static wrapComponent<C>(
    comp: OrchestratorDynamicComponentType<C>,
    config?: C,
  ): OrchestratorConfigItem<C> {
    return {
      component: comp,
      config,
      items: [ComposerDroppableComponent.wrapperConfig],
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

  drop(e: CdkDragDrop<any>, conf?: string) {
    const compType = e.item.data as OrchestratorDynamicComponentType;
    const config = ComposerDroppableComponent.wrapComponent(
      compType,
      JSON.parse(conf || 'null'),
    );

    this.droppedConfig = config;

    if (this.parentDroppable) {
      this.parentDroppable.addItem(config);
    } else {
      this.config = { item: config };
    }

    this.componentDropped.emit(compType);
  }

  addItem(item: OrchestratorConfigItem) {
    this.renderComponent.removeItem(ComposerDroppableComponent.wrapperConfig);

    this.renderComponent.addItem(
      ComposerDroppableComponent.wrapComponent(ComposerDroppableComponent, {
        item,
      }),
    );

    this.renderComponent.addItem(ComposerDroppableComponent.wrapperConfig);
  }
}
