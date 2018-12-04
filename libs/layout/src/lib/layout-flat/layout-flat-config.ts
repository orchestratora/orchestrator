import { Injectable } from '@angular/core';

import {
  LayoutFlatAlignContentOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatDirectionOptions,
  LayoutFlatJustifyOptions,
  LayoutFlatWrapOptions,
} from '../types';

/**
 * Default configuration for FlatLayoutConfig
 */
@Injectable({ providedIn: 'root' })
export class OrchestratorLayoutFlatConfig {
  direction: LayoutFlatDirectionOptions | undefined;
  wrap: LayoutFlatWrapOptions | undefined;
  justify: LayoutFlatJustifyOptions | undefined;
  alignItems: LayoutFlatAlignItemsOptions | undefined;
  alignContent: LayoutFlatAlignContentOptions | undefined;
}
