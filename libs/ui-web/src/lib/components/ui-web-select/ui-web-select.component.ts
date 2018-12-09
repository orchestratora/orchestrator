import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UiWebSelectOption, UiWebSelectOptionGroup, UiWebSelectOptionPair } from './types';

@Component({
  selector: 'orc-ui-web-select',
  templateUrl: './ui-web-select.component.html',
  styleUrls: ['./ui-web-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiWebSelectComponent {
  @Input() options: UiWebSelectOption[];

  @Input() name: string;
  @Input() size: number;
  @Input() tabIndex: number;
  @Input() multiple: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() autofocus: boolean;

  isOptionGroup(option: UiWebSelectOption): option is UiWebSelectOptionGroup {
    return typeof option === 'object' && 'children' in option;
  }

  isOptionPair(option: UiWebSelectOption): option is UiWebSelectOptionPair {
    return typeof option === 'object' && 'value' in option;
  }
}
