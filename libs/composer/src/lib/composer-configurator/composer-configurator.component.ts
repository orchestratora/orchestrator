import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ComponentLocatorService,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';
import { Observable, Subject } from 'rxjs';
import { switchAll } from 'rxjs/operators';

import {
  ComposerConfiguratorService,
  ControlConfigObject,
} from './composer-configurator.service';

/**
 * @internal
 */
@Component({
  selector: 'orc-composer-configurator',
  templateUrl: './composer-configurator.component.html',
  styleUrls: ['./composer-configurator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerConfiguratorComponent implements OnChanges {
  setFormChanges$ = new Subject<Observable<any>>();

  @Input() component: OrchestratorDynamicComponentType;
  @Input() config: any;

  @Output() configUpdate = this.setFormChanges$.pipe(switchAll());

  formConfig: ControlConfigObject;
  formGroup: FormGroup;
  componentDefaultConfig: any;
  defaultConfig: any;

  constructor(
    private componentLocatorService: ComponentLocatorService,
    private composerConfiguratorService: ComposerConfiguratorService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('component' in changes) {
      this.updateDefaultConfig();
      this.updateForm();
    } else if ('config' in changes) {
      this.updateConfig();
      if (this.formGroup) {
        this.formGroup.patchValue(this.defaultConfig, { emitEvent: false });
      }
    }
  }

  private updateDefaultConfig() {
    this.componentDefaultConfig = this.componentLocatorService.getDefaultConfig(
      this.component,
    );
    this.updateConfig();
  }

  private updateConfig() {
    this.defaultConfig = {
      ...this.componentDefaultConfig,
      ...this.config,
    };
  }

  private updateForm() {
    const info = this.composerConfiguratorService.genFormAndConfigFor(
      this.component,
      this.defaultConfig,
    );

    this.formConfig = info.formConfig;
    this.formGroup = info.formGroup;

    this.setFormChanges$.next(this.formGroup.valueChanges);
  }
}
