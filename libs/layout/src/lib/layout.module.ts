import { ModuleWithProviders, NgModule } from '@angular/core';

import { LayoutFlexModule } from './flex';
import { LayoutFlatHostModule } from './layout-flat-host';

@NgModule({
  exports: [LayoutFlexModule, LayoutFlatHostModule],
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule,
      providers: [...LayoutFlatHostModule.forRoot().providers],
    };
  }
}
