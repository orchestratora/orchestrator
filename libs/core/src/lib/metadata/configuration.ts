import { Type } from '@angular/core';

import { createMetadataGetSet } from './util';

export interface ConfigurationMeta {
  prop: string | symbol;
  decorator: any;
  args: any[];
}

const configurationMeta = createMetadataGetSet<ConfigurationMeta[]>(
  'ConfigurationMeta',
);

/**
 * @internal
 */
export function addConfig(target: any, meta: ConfigurationMeta) {
  const configs = getConfigs(target) || [];
  configurationMeta.set([...configs, meta], target);
}

/**
 * @internal
 */
export function getConfigs(type: Type<any>): ConfigurationMeta[] {
  return configurationMeta.get(type);
}
