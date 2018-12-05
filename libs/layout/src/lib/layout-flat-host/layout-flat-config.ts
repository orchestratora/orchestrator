import { Injectable } from '@angular/core';

import {
  LayoutFlatAlignContentOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatDirectionOptions,
  LayoutFlatJustifyOptions,
  LayoutFlatWrapOptions,
} from '../types';

export function mergeLayoutFlatConfigs(
  finalConfig: LayoutFlatConfig,
  config: LayoutFlatConfig,
): LayoutFlatConfig {
  return { ...finalConfig, ...config };
}

/**
 * Default configuration for {@link LayoutFlatHostComponent}
 */
@Injectable({ providedIn: 'root' })
export class LayoutFlatConfig {
  wrap?: LayoutFlatWrapOptions;
  direction?: LayoutFlatDirectionOptions;
  justify?: LayoutFlatJustifyOptions;
  alignItems?: LayoutFlatAlignItemsOptions;
  alignContent?: LayoutFlatAlignContentOptions;

  static merge(...configs: LayoutFlatConfig[]): LayoutFlatConfig {
    return configs.reduce(mergeLayoutFlatConfigs);
  }
}
