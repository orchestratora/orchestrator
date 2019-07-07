import { Injectable } from '@angular/core';
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
  OptionAllowedValues,
  OptionInteger,
  OptionRange,
  OptionRequired,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';

export interface ConfigurationMetaObject {
  [key: string]: ConfigurationMeta[];
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

@Injectable()
export class ComposerConfiguratorService {
  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private componentLocatorService: ComponentLocatorService,
  ) {}

  genFormAndConfigFor(
    component: OrchestratorDynamicComponentType,
    defaultFormValues?: any,
  ) {
    const configType = this.componentLocatorService.getConfigType(component);
    const configMeta = this.configService.getMetaOf(configType);

    const formConfig = this.genFormConfigFromMeta(
      configMeta,
      defaultFormValues,
    );
    const formGroup = this.genFormGroupFromConfig(formConfig);

    return { formConfig, formGroup };
  }

  genFormConfigFromMeta(
    configMeta: ConfigurationMeta[],
    defaultValues: any = {},
  ): ControlConfigObject {
    const groupedConfig = this.groupConfigByProp(configMeta);

    return Object.entries(groupedConfig).reduce((acc, [prop, meta]) => {
      const controlConfig = this.genControlConfigFrom(
        meta,
        defaultValues[prop],
      );
      return { ...acc, [prop]: controlConfig };
    }, {});
  }

  genFormGroupFromConfig(formConfig: ControlConfigObject): FormGroup {
    const group = Object.entries(formConfig).reduce((acc, [prop, meta]) => {
      acc[prop] = this.fb.control(meta.default, meta.validators);
      return acc;
    }, {});
    return this.fb.group(group);
  }

  private groupConfigByProp(
    configMeta: ConfigurationMeta[],
  ): ConfigurationMetaObject {
    return configMeta.reduce((acc, c) => {
      const array = acc[c.prop] || [];
      array.push(c);
      acc[c.prop] = array;
      return acc;
    }, {});
  }

  private genControlConfigFrom(
    configMeta: ConfigurationMeta[],
    defaultValue?: any,
  ): ControlConfig {
    return configMeta.reduce(
      (acc, meta) => {
        if (!acc.tag) {
          acc.tag = 'input';

          switch (meta.type) {
            case Number:
              acc.tag = 'input-number';
              break;
            case Boolean:
              acc.tag = 'switch';
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
            acc.tag = 'input-number';
            break;
          case OptionRange:
            const [min, max, step] = meta.args as Parameters<
              typeof OptionRange
            >;
            acc.tag =
              !Number.isFinite(max) || !Number.isFinite(min)
                ? 'input-number'
                : 'slider';
            acc.extras.min = min;
            acc.extras.max = max;
            acc.extras.step = step;
            acc.validators.push(Validators.min(min));
            acc.validators.push(Validators.max(max));
            break;
          case OptionAllowedValues:
            const [options] = meta.args as Parameters<
              typeof OptionAllowedValues
            >;

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
