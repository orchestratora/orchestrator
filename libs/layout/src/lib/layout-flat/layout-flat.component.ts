import {
  Component,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';

import { OrchestratorFlatLayoutConfig } from './layout-flat-config';
import {
  LayoutFlatDirectionOptions,
  LayoutFlatWrapOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatAlignContentOptions,
  LayoutFlatJustifyOptions,
} from '../types';

@Component({
  selector: 'orc-layout-flat',
  templateUrl: './layout-flat.component.html',
  styleUrls: ['./layout-flat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutFlatComponent {
  @Input() items: ReadonlyArray<OrchestratorConfigItem<any>>;

  /**
   * Direction to flex the layout
   * Used for flex-direction
   * {@see LayoutFlatDirectionOptions}
   */
  @Input() direction: LayoutFlatDirectionOptions;

  /**
   * Option to wrap the layout
   * Used for flex-wrap
   * {@see LayoutFlatWrapOptions}
   */
  @Input() wrap: LayoutFlatWrapOptions;

  /**
   * Option to se `justify-content`
   * {@see LayoutFlatJustifyOptions}
   */
  @Input() justify: LayoutFlatJustifyOptions;

  /**
   * Option to se `align-items`
   * {@see LayoutFlatAlignItemsOptions}
   */
  @Input() alignItems: LayoutFlatAlignItemsOptions;

  /**
   * Option to se `align-content`
   * {@see LayoutFlatAlignContentOptions}
   */
  @Input() alignContent: LayoutFlatAlignContentOptions;

  /**
   * Number of columns to be displayed in each row
   */
  @Input() columns: number;

  /**
   * Emitted after all, and if, all the `items` have been rendered
   */
  @Output() afterItemsRendered = new EventEmitter<Array<ComponentRef<any>>>();

  /**
   * Array of rendered items
   * @private
   */
  private _itemsRendered: Array<ComponentRef<any>> = [];

  /**
   * Used by the component to get the classes to be set in the wrapper
   */
  get wrapperClasses() {
    return {
      [`layout-flex__${this.wrap}`]: true,
      [`layout-flex__${this.direction}`]: true,
      [`layout-flex__justify-content-${this.justify}`]: true,
      [`layout-flex__align-items-${this.alignItems}`]: true,
      [`layout-flex__align-items-${this.alignItems}`]: true,
    };
  }

  constructor(public defaultConfig: OrchestratorFlatLayoutConfig) {
    this.columns = defaultConfig.columns;
    this.wrap = defaultConfig.wrap;
    this.direction = defaultConfig.direction;
    this.alignItems = defaultConfig.alignItems;
    this.justify = defaultConfig.justify;
  }

  onComponentCreated(component: ComponentRef<any>) {
    this._itemsRendered.push(component);

    if (this._itemsRendered.length === this.items.length) {
      this.afterItemsRendered.emit(this._itemsRendered);
      return;
    }
  }
}
