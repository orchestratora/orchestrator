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

import { ControlConfigObject } from '../decorator-config';
import { ComposerConfiguratorService } from './composer-configurator.service';

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

  @Input() component: string | OrchestratorDynamicComponentType;
  @Input() config: any;

  @Output() configUpdate = this.setFormChanges$.pipe(switchAll());

  formConfig: ControlConfigObject;
  formGroup: FormGroup;
  componentDefaultConfig: any;
  defaultConfig: any;

  private componentType: OrchestratorDynamicComponentType;

  constructor(
    private componentLocatorService: ComponentLocatorService,
    private composerConfiguratorService: ComposerConfiguratorService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('component' in changes) {
      this.updateComponent();
      this.updateDefaultConfig();
      this.updateForm();
    } else if ('config' in changes) {
      this.updateConfig();
      if (this.formGroup) {
        this.formGroup.patchValue(this.defaultConfig, { emitEvent: false });
      }
    }
  }

  private updateComponent() {
    this.componentType = this.componentLocatorService.resolve(this.component);
  }

  private updateDefaultConfig() {
    this.componentDefaultConfig = this.componentLocatorService.getDefaultConfig(
      this.componentType,
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
      this.componentType,
      this.defaultConfig,
    );

    this.formConfig = info.formConfig;
    this.formGroup = info.formGroup;

    this.setFormChanges$.next(this.formGroup.valueChanges);
  }
}
