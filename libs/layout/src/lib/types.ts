export type LayoutFlatCommonOptions = 'initial' | 'inherit';

export type LayoutFlatWrapOptions = LayoutFlatCommonOptions | 'wrap' | 'nowrap' | 'wrap-reverse';

export type LayoutFlatDirectionOptions = LayoutFlatCommonOptions | 'row' | 'column';

export type LayoutFlatFlexOptions = LayoutFlatCommonOptions | 'center' | 'flex-end' | 'flex-start';

export type LayoutFlatJustifyOptions =
  | LayoutFlatFlexOptions
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type LayoutFlatAlignItemsOptions = LayoutFlatFlexOptions | 'baseline' | 'stretch';

export type LayoutFlatAlignContentOptions =
  | LayoutFlatFlexOptions
  | 'space-between'
  | 'space-around'
  | 'stretch';
