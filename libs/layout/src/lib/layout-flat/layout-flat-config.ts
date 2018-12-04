import { Injectable } from '@angular/core';
import {
  LayoutFlatWrapOptions,
  LayoutFlatDirectionOptions,
  LayoutFlatAlignItemsOptions,
  LayoutFlatJustifyOptions,
} from '../types';

/**
 * Default configuration for FlatLayoutConfig
 */

@Injectable({ providedIn: 'root' })
export class OrchestratorFlatLayoutConfig {
  direction: LayoutFlatDirectionOptions = 'row';
  wrap: LayoutFlatWrapOptions = 'wrap';
  justify: LayoutFlatJustifyOptions = 'space-between';
  alignItems: LayoutFlatAlignItemsOptions = 'center';
  columns = 3;
}
