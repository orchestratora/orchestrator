import { CommonModule } from '@angular/common';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';

import { ComponentLocatorService } from './component-locator/component-locator.service';
import { ComponentRegistry, COMPONENTS } from './component-map';
import { ConfigurationService } from './config/configuration.service';
import { ErrorStrategy } from './error-strategy/error-strategy';
import { ThrowErrorStrategy } from './error-strategy/throw-error-strategy';
import { OrchestratorComponent } from './orchestrator/orchestrator.component';
import { RenderItemComponent } from './render-item/render-item.component';
import { OrchestratorDynamicComponentType } from './types';

@NgModule({
  imports: [CommonModule, DynamicModule.withComponents([])],
  declarations: [OrchestratorComponent, RenderItemComponent],
  exports: [OrchestratorComponent, RenderItemComponent],
})
export class OrchestratorCoreModule {
  static withComponents(
    components: ComponentRegistry<OrchestratorDynamicComponentType>,
  ): ModuleWithProviders {
    return {
      ngModule: OrchestratorCoreModule,
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: components,
          multi: true,
        },
        { provide: COMPONENTS, useValue: components, multi: true },
        { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
        ComponentLocatorService,
        ConfigurationService,
      ],
    };
  }
}
