import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  UiWebHeadingHostModule,
  UiWebImageHostModule,
  UiWebInputHostModule,
  UiWebSelectHostModule,
  UiWebTextareaHostModule,
  UiWebTextHostModule,
} from './components';
import { UiWebButtonHostModule } from './components/ui-web-button-host';

/**
 * @deprecated Use `@orchestrator/html-tag` package instead.
 */
@NgModule({
  exports: [
    UiWebButtonHostModule,
    UiWebImageHostModule,
    UiWebTextHostModule,
    UiWebHeadingHostModule,
    UiWebInputHostModule,
    UiWebSelectHostModule,
    UiWebTextareaHostModule,
  ],
})
export class UiWebModule {
  static forRoot(): ModuleWithProviders<UiWebModule> {
    return {
      ngModule: UiWebModule,
      providers: [
        ...UiWebButtonHostModule.forRoot().providers,
        ...UiWebImageHostModule.forRoot().providers,
        ...UiWebTextHostModule.forRoot().providers,
        ...UiWebHeadingHostModule.forRoot().providers,
        ...UiWebInputHostModule.forRoot().providers,
        ...UiWebSelectHostModule.forRoot().providers,
        ...UiWebTextareaHostModule.forRoot().providers,
      ],
    };
  }
}
