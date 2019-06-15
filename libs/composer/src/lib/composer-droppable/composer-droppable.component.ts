import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorDynamicComponent,
  OrchestratorDynamicComponentType,
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
  implements OrchestratorDynamicComponent {

  @Input() config: ComposerDroppableConfig;

  @Output() componentDrop = new EventEmitter<OrchestratorConfigItem>();
  static getWrapperConfig() {
    return {
      component: ComposerDroppableComponent,
      handlers: {
        componentDrop(
          updateConfig,
          getInjector,
          injectFlags,
          getComponent,
          $config: OrchestratorConfigItem,
        ) {
          updateConfig($config);
          const getParentDroppableInjector = getInjector().get(
            'getInjector',
            injectFlags.SkipSelf,
          );
          const parentUpdateConfig = getParentDroppableInjector().get(
            'updateConfig',
          );
          const parentGetConfig = getParentDroppableInjector().get('getConfig');
          const parentConfigItems = parentGetConfig().items || [];
          parentUpdateConfig({
            items: [
              ...parentConfigItems,
              getComponent().constructor.getWrapperConfig(),
            ],
          });
        },
      },
    };
  }

  static wrapComponent(comp) {
    return {
      component: comp,
      items: [ComposerDroppableComponent.getWrapperConfig()],
    };
  }

  drop(e: CdkDragDrop<any>) {
    const compType = e.item.data as OrchestratorDynamicComponentType;
    this.componentDrop.emit(ComposerDroppableComponent.wrapComponent(compType));
  }
}
