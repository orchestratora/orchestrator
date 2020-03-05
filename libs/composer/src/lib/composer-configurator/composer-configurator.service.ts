import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ComponentLocatorService,
  ConfigurationMeta,
  ConfigurationService,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';

import {
  ControlConfig,
  ControlConfigObject,
  DECORATOR_CONFIGS_INITIALIZER_TOKEN,
  DECORATOR_CONFIGS_TOKEN,
  DecoratorConfigFn,
  PropDecoratorFactory,
} from '../decorator-config';

export interface ConfigurationMetaObject {
  [key: string]: ConfigurationMeta[];
}

@Injectable()
export class ComposerConfiguratorService {
  private decoratorConfigsInit = this.injector.get(
    DECORATOR_CONFIGS_INITIALIZER_TOKEN,
    [],
  );
  private decoratorConfigs = this.injector.get(DECORATOR_CONFIGS_TOKEN, []);

  private decoratorConfigGroups = this.decoratorConfigs.reduce(
    (acc, config) => {
      acc.set(config.type, [
        ...(acc.get(config.type) || []),
        config.fn as DecoratorConfigFn<any>,
      ]);
      return acc;
    },
    new Map<PropDecoratorFactory, DecoratorConfigFn<any>[]>(),
  );

  constructor(
    private injector: Injector,
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
      (config, meta) => this.applyConfig(config, meta),
      this.getInitialConfig(configMeta, defaultValue),
    );
  }

  private getInitialConfig(
    configMeta: ConfigurationMeta[],
    defaultValue?: any,
  ): ControlConfig {
    return configMeta.reduce(
      (config, meta) => {
        this.decoratorConfigsInit.forEach(fn =>
          fn(config, meta.args, meta.type, meta.decorator),
        );
        return config;
      },
      {
        validators: [],
        component: null,
        extras: {},
        default: defaultValue,
      } as ControlConfig,
    );
  }

  private applyConfig(config: ControlConfig, meta: ConfigurationMeta) {
    const decoratorConfigFns = this.decoratorConfigGroups.get(meta.decorator);

    if (!decoratorConfigFns) {
      return config;
    }

    decoratorConfigFns.forEach(fn => fn(config, meta.args, meta.type));

    return config;
  }
}
