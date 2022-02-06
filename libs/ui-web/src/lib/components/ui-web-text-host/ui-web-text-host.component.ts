import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  DynamicComponent,
  OrchestratorDynamicComponent,
} from '@orchestrator/core';

import { UiWebTextConfig, UiWebTextFn } from './ui-web-text-config';

@Component({
  selector: 'orc-ui-web-text-host',
  templateUrl: './ui-web-text-host.component.html',
  styleUrls: ['./ui-web-text-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@DynamicComponent({ config: UiWebTextConfig })
export class UiWebTextHostComponent
  implements OrchestratorDynamicComponent<UiWebTextConfig>, OnInit, OnChanges {
  @Input() config: UiWebTextConfig;
  @Input() context: any;

  text: string;

  ngOnInit(): void {
    this.updateText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes || 'context' in changes) {
      this.updateText();
    }
  }

  private updateText() {
    if (this.config.textFn) {
      this.text = (this.config.textFn as UiWebTextFn<any>)(this.context);
    } else {
      this.text = this.config.text;
    }
  }
}
