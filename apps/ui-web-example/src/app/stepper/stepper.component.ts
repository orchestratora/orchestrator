import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InferContexts, OrchestratorConfigItem } from '@orchestrator/core';
import { LayoutFlatConfig } from '@orchestrator/layout';
import { StepConfig, Stepper, StepperConfig } from '@orchestrator/stepper';
import {
  UiWebButtonConfig,
  UiWebHeadingConfig,
  UiWebImageConfig,
  UiWebTextConfig,
} from '@orchestrator/ui-web';

@Component({
  selector: 'orc-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  config: OrchestratorConfigItem = {
    component: 'orc-stepper-host',
    config: {
      loopSteps: true,
      header: {
        component: 'orc-ui-web-text-host',
        config: {
          textFn: ($ctx, stepper: Stepper) =>
            `Step ${stepper.currentStepIdx + 1} of ${stepper.stepsCount} - ${
              $ctx.config.name
            }`,
        } as UiWebTextConfig<InferContexts<StepperConfig>>,
      },
    } as StepperConfig,
    items: [
      {
        component: 'orc-step-host',
        config: { id: 'img-react', name: 'React Logo' } as StepConfig,
        items: [
          {
            component: 'orc-ui-web-image-host',
            config: {
              src:
                'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
              width: '512px',
            } as UiWebImageConfig,
          },
        ],
      },
      {
        component: 'orc-step-host',
        config: {
          id: 'img-ng',
          name: 'Angular Logo',
          header: {
            component: 'orc-ui-web-text-host',
            config: {
              text: 'Awesome Angular Step',
            } as UiWebTextConfig<InferContexts<StepConfig>>,
          },
        } as StepConfig,
        items: [
          {
            component: 'orc-ui-web-image-host',
            config: {
              src:
                'https://cdn3.iconfinder.com/data/icons/logos-3/250/angular-512.png',
              width: '512px',
            } as UiWebImageConfig,
          },
        ],
      },
      {
        component: 'orc-step-host',
        config: { id: 'img-polymer', name: 'Polymer Logo' } as StepConfig,
        items: [
          {
            component: 'orc-ui-web-image-host',
            config: {
              src: 'https://avatars.githubusercontent.com/u/2159051?size=512',
              width: '512px',
            } as UiWebImageConfig,
          },
        ],
      },
      {
        component: 'orc-step-host',
        config: { id: 'img-ember', name: 'Ember Logo' } as StepConfig,
        items: [
          {
            component: 'orc-ui-web-image-host',
            config: {
              src:
                'https://ih1.redbubble.net/image.392864785.7345/ap,550x550,16x12,1,transparent,t.png',
              height: '512px',
            } as UiWebImageConfig,
          },
        ],
      },
      {
        component: 'orc-step-host',
        config: {
          id: 'img-vue',
          name: 'VueJs Logo',
          header: false,
          footer: false,
        } as StepConfig,
        items: [
          {
            component: 'orc-layout-flat-host',
            config: { direction: 'column' } as LayoutFlatConfig,
            items: [
              {
                component: 'orc-ui-web-heading-host',
                config: {
                  text: 'Custom Header - Vue Logo!',
                  level: 2,
                } as UiWebHeadingConfig,
              },
              {
                component: 'orc-ui-web-image-host',
                config: {
                  src:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/600px-Vue.js_Logo.svg.png',
                  width: '512px',
                } as UiWebImageConfig,
              },
              {
                component: 'orc-ui-web-button-host',
                config: { text: 'To Beginning' } as UiWebButtonConfig,
                handlers: {
                  click: (stepper: Stepper) => stepper.goToStart(),
                },
              },
              {
                component: 'orc-ui-web-button-host',
                config: { text: 'Checkout Angular!' } as UiWebButtonConfig,
                handlers: {
                  click: (stepper: Stepper) => stepper.goTo('img-ng'),
                },
              },
            ],
          },
        ],
      },
    ],
  };
}
