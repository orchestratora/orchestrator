import { Injectable } from '@angular/core';

import {
  LayoutFlatAlignContentOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatDirectionOptions,
  LayoutFlatJustifyOptions,
  LayoutFlatWrapOptions,
} from '../types';

/**
 * Default configuration for {@link LayoutFlatHostComponent}
 */
@Injectable()
export class LayoutFlatConfig {
  wrap?: LayoutFlatWrapOptions;
  direction?: LayoutFlatDirectionOptions;
  justify?: LayoutFlatJustifyOptions;
  alignItems?: LayoutFlatAlignItemsOptions;
  alignContent?: LayoutFlatAlignContentOptions;
}
