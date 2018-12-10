import { Component } from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';
import { UiWebButtonConfig } from '@orchestrator/ui-web';

@Component({
  selector: 'orc-layout-button',
  templateUrl: './layout-button.component.html',
  styleUrls: ['./layout-button.component.css'],
})
export class LayoutButtonComponent {
  config: OrchestratorConfigItem = {
    component: 'orc-layout-flat-host',
    items: [
      {
        component: 'orc-ui-web-button-host',
        config: { text: 'Button #1' } as UiWebButtonConfig,
      },
      {
        component: 'orc-ui-web-button-host',
        config: { text: 'Button #2', disabled: true } as UiWebButtonConfig,
      },
      {
        component: 'orc-ui-web-button-host',
        config: { text: 'Button #3' } as UiWebButtonConfig,
      },
    ],
  };
}
