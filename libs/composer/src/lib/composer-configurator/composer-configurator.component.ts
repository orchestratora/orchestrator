import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ComponentLocatorService,
  ConfigurationMeta,
  ConfigurationService,
  OptionInteger,
  OptionRange,
  OptionRequired,
  OrchestratorDynamicComponentType,
  OptionAllowedValues,
} from '@orchestrator/core';

/**
 * @internal
 */
@Component({
  selector: 'orc-composer-configurator',
  templateUrl: './composer-configurator.component.html',
  styleUrls: ['./composer-configurator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposerConfiguratorComponent implements OnInit, OnChanges {
  @Input() component: OrchestratorDynamicComponentType;

  formConfig: ControlConfigObject;
  formGroup: FormGroup;

  constructor(
    private configService: ConfigurationService,
    private componentLocatorService: ComponentLocatorService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.updateConfigMeta();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('component' in changes) {
      this.updateConfigMeta();
    }
  }

  private updateConfigMeta() {
    const configType = this.componentLocatorService.getConfigType(
      this.component,
    );
    const defaultConfig = this.componentLocatorService.getDefaultConfig(
      this.component,
    );
    const configMeta = this.configService.getMetaOf(configType);
    const groupedConfig = this.groupConfigByProp(configMeta);

    this.formConfig = this.genConfigFromMeta(groupedConfig, defaultConfig);
    this.formGroup = this.genFormGroupFromConfig(this.formConfig);

    console.log(this.formConfig);
  }

  private genFormGroupFromConfig(config: ControlConfigObject): FormGroup {
    const group = Object.entries(config).reduce(
      (acc, [prop, meta]) => {
        acc[prop] = this.fb.control(meta.default, meta.validators);
        return acc;
      },
      {} as FormGroup,
    );
    return this.fb.group(group);
  }

  private groupConfigByProp(
    configMeta: ConfigurationMeta[],
  ): { [k: string]: ConfigurationMeta[] } {
    return configMeta.reduce((acc, c) => {
      const array = acc[c.prop] || [];
      array.push(c);
      acc[c.prop] = array;
      return acc;
    }, {});
  }

  private genConfigFromMeta(
    propsMeta: {
      [k: string]: ConfigurationMeta[];
    },
    defaultConfig: any,
  ): ControlConfigObject {
    return Object.entries(propsMeta).reduce((acc, [prop, meta]) => {
      const controlConfig = this.genControlConfigFrom(
        meta,
        defaultConfig[prop],
      );
      return { ...acc, [prop]: controlConfig };
    }, {});
  }

  private genControlConfigFrom(
    metas: ConfigurationMeta[],
    defaultValue?: any,
  ): ControlConfig {
    return metas.reduce(
      (acc, meta) => {
        if (!acc.tag) {
          acc.tag = 'input';

          switch (meta.type) {
            case Number:
              acc.type = 'number';
              break;
            case Boolean:
              acc.tag = 'select';
              acc.options = [true, false];
              break;
            default:
              acc.type = 'text';
          }
        }

        switch (meta.decorator) {
          case OptionRequired:
            acc.validators.push(Validators.required);
            acc.extras.required = true;
            break;
          case OptionInteger:
            acc.validators.push(Validators.pattern(/^-?\d+$/));
            acc.tag = 'input';
            acc.type = 'number';
            break;
          case OptionRange:
            const [min, max, step] = meta.args;
            acc.tag =
              !Number.isFinite(max) || !Number.isFinite(min)
                ? 'input'
                : 'slider';
            acc.type = 'number';
            acc.extras.min = min;
            acc.extras.max = max;
            acc.extras.step = step;
            acc.validators.push(Validators.min(min));
            acc.validators.push(Validators.max(max));
            break;
          case OptionAllowedValues:
            const [options] = meta.args;

            acc.tag = options.some(opt => typeof opt === 'function')
              ? 'input'
              : 'select';
            acc.type = 'text';
            acc.options = options;
            break;
        }
        return acc;
      },
      {
        validators: [],
        tag: '',
        extras: {},
        default: defaultValue,
      } as ControlConfig,
    );
  }
}

export interface ControlConfig {
  validators: ValidatorFn[];
  tag: string;
  type?: string;
  options?: any[];
  extras: any;
  default?: any;
}

export interface ControlConfigObject {
  [key: string]: ControlConfig;
}
