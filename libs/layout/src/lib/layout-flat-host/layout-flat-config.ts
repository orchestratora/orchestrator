import { Injectable } from '@angular/core';
import { OptionAllowedValues } from '@orchestrator/core';

import {
  LayoutFlatAlignContentOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatDirectionOptions,
  LayoutFlatJustifyOptions,
  LayoutFlatWrapOptions,
} from '../types';

const baseOptions = ['initial', 'inherit'];
const spacingOptions = ['center', 'flex-end', 'flex-start'];

/**
 * Default configuration for {@link LayoutFlatHostComponent}
 */
@Injectable()
export class LayoutFlatConfig {
  @OptionAllowedValues(...baseOptions, 'wrap', 'nowrap', 'wrap-reverse')
  wrap?: LayoutFlatWrapOptions;

  @OptionAllowedValues(...baseOptions, 'row', 'column')
  direction?: LayoutFlatDirectionOptions;

  @OptionAllowedValues(
    ...baseOptions,
    ...spacingOptions,
    'space-between',
    'space-around',
    'space-evenly',
  )
  justify?: LayoutFlatJustifyOptions;

  @OptionAllowedValues(...baseOptions, ...spacingOptions, 'baseline', 'stretch')
  alignItems?: LayoutFlatAlignItemsOptions;

  @OptionAllowedValues(
    ...baseOptions,
    ...spacingOptions,
    'space-between',
    'space-around',
    'stretch',
  )
  alignContent?: LayoutFlatAlignContentOptions;
}
