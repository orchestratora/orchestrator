import { Type } from '@angular/core';

import { createMetadataGetSet } from './util';

const Reflect = (window as any).Reflect;

export interface PartialConfigurationMeta {
  prop: string | symbol;
  decorator: any;
  args: any[];
}

export interface ConfigurationMeta extends PartialConfigurationMeta {
  type: any;
}

const configurationMeta = createMetadataGetSet<ConfigurationMeta[]>(
  'ConfigurationMeta',
);

/**
 * @internal
 */
export function addConfig(target: any, meta: PartialConfigurationMeta) {
  const configs = getConfigs(target);
  const fullMeta: ConfigurationMeta = {
    ...meta,
    type: readPropType(target, meta.prop),
  };
  configurationMeta.set([...configs, fullMeta], target);
}

/**
 * @internal
 */
export function getConfigs(type: Type<any>): ConfigurationMeta[] {
  return configurationMeta.get(type) || [];
}

export function readPropType(target: Object, prop: string | symbol): any {
  return Reflect.getMetadata('design:type', target, prop);
}
