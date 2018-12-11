import { Component } from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';
import { UiWebButtonConfig } from '@orchestrator/ui-web';

@Component({
  selector: 'orc-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.css'],
})
export class SimpleButtonComponent {
  config: OrchestratorConfigItem = {
    component: 'orc-ui-web-button-host',
    config: {
      text: 'Dynamic Button',
    } as UiWebButtonConfig,
  };
}
