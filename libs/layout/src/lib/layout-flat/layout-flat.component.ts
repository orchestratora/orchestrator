import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';

import { OrchestratorLayoutFlatConfig } from './layout-flat-config';

@Component({
  selector: 'orc-layout-flat',
  templateUrl: './layout-flat.component.html',
  styleUrls: ['./layout-flat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutFlatComponent {
  @Input() items: ReadonlyArray<OrchestratorConfigItem>;

  /**
   * Option to wrap the layout
   * Used for flex-wrap
   */
  @Input() wrap = this.defaultConfig.wrap;

  /**
   * Direction to flex the layout
   * Used for flex-direction
   */
  @Input() direction = this.defaultConfig.direction;

  /**
   * Option to se `justify-content`
   */
  @Input() justify = this.defaultConfig.justify;

  /**
   * Option to se `align-items`
   */
  @Input() alignItems = this.defaultConfig.alignItems;

  /**
   * Option to se `align-content`
   */
  @Input() alignContent = this.defaultConfig.alignContent;

  /**
   * Emitted after all, and if, all the `items` have been rendered
   */
  @Output() afterItemsRendered = new EventEmitter<Array<ComponentRef<any>>>();

  /**
   * Array of rendered items
   * @private
   */
  private _itemsRendered: Array<ComponentRef<any>> = [];

  constructor(private defaultConfig: OrchestratorLayoutFlatConfig) {}

  onComponentCreated(component: ComponentRef<any>) {
    this._itemsRendered.push(component);

    if (this._itemsRendered.length === this.items.length) {
      this.afterItemsRendered.emit(this._itemsRendered);
    }
  }
}
