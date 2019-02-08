import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';
import { UiWebButtonConfig } from '@orchestrator/ui-web';

@Component({
  selector: 'orc-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleButtonComponent {
  config: OrchestratorConfigItem = {
    component: 'orc-ui-web-button-host',
    config: {
      text: 'Click me to update text',
      click: (getConfig, $event: Event) => {
        getConfig().text =
          getConfig().text === 'New Text!' ? 'Other Text!' : 'New Text!';
        console.log($event);
      },
    } as UiWebButtonConfig,
  };
}
