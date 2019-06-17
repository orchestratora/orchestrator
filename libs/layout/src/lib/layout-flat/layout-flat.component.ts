import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';

@Component({
  selector: 'orc-layout-flat',
  templateUrl: './layout-flat.component.html',
  styleUrls: ['./layout-flat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LayoutFlatComponent {
  @Input() items: ReadonlyArray<OrchestratorConfigItem>;

  /**
   * Emitted after all, and if, all the `items` have been rendered
   */
  @Output() afterItemsRendered = new EventEmitter<Array<ComponentRef<any>>>();

  @HostBinding('class.layout-flat-orc') readonly classLayoutFlat = true;

  private _itemsRendered: Array<ComponentRef<any>> = [];

  trackByComponent(item: OrchestratorConfigItem) {
    return item.component;
  }

  onComponentCreated(component: ComponentRef<any>) {
    this._itemsRendered.push(component);

    if (this._itemsRendered.length === this.items.length) {
      this.afterItemsRendered.emit(this._itemsRendered);
    }
  }
}
