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
    } as UiWebButtonConfig,
    handlers: {
      click: (getConfig, $event: Event, renderComponent) => {
        getConfig().text =
          getConfig().text === 'New Text!' ? 'Other Text!' : 'New Text!';
        renderComponent.markForCheck();
        console.log($event);
      },
      mouseover: ($event: Event, getConfig, updateConfig) => {
        updateConfig({ text: getConfig().text + ' over' });
        console.log('Mouseover button', $event);
      },
      mouseout: ($event: Event, getConfig, updateConfig) => {
        updateConfig({ text: getConfig().text.replace(' over', '') });
        console.log('Mouseout button', $event);
      },
    },
  };
}
