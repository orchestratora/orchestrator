import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicComponent, OrchestratorDynamicComponent } from '@orchestrator/core';

import {
  UiWebSelectConfig,
  UiWebSelectOption,
  UiWebSelectOptionGroup,
  UiWebSelectOptionPair,
} from './ui-web-select-config';

@Component({
  selector: 'orc-ui-web-select-host',
  templateUrl: './ui-web-select-host.component.html',
  styleUrls: ['./ui-web-select-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebSelectConfig })
export class UiWebSelectHostComponent implements OrchestratorDynamicComponent<UiWebSelectConfig> {
  @Input() config: UiWebSelectConfig;

  isOptionGroup(option: UiWebSelectOption): option is UiWebSelectOptionGroup {
    return typeof option === 'object' && 'children' in option;
  }

  isOptionPair(option: UiWebSelectOption): option is UiWebSelectOptionPair {
    return typeof option === 'object' && 'value' in option;
  }
}
