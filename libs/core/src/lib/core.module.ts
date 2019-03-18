import { CommonModule } from '@angular/common';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';

import { ComponentLocatorService } from './component-locator/component-locator.service';
import { COMPONENTS } from './component-map';
import { ComponentRegistry } from './component-registry';
import { ConfigurationService } from './config/configuration.service';
import { ErrorStrategy } from './error-strategy/error-strategy';
import { ThrowErrorStrategy } from './error-strategy/throw-error-strategy';
import { INJECTOR_MAP_PROVIDERS } from './injectors/providers';
import { OrchestratorComponent } from './orchestrator/orchestrator.component';
import { RenderItemComponent } from './render-item/render-item.component';
import { OrchestratorDynamicComponentType } from './types';

@NgModule({
  imports: [CommonModule, DynamicModule.withComponents([])],
  declarations: [OrchestratorComponent, RenderItemComponent],
  exports: [OrchestratorComponent, RenderItemComponent],
})
export class OrchestratorCoreModule {
  /**
   * Use this to import module in root application only once
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OrchestratorCoreModule,
      providers: [...OrchestratorCoreModule.getRootProviders()],
    };
  }

  /**
   * Use this to import module with components in root application only once
   */
  static withComponents(
    components: ComponentRegistry<OrchestratorDynamicComponentType>,
  ): ModuleWithProviders {
    return {
      ngModule: OrchestratorCoreModule,
      providers: [
        ...OrchestratorCoreModule.getRootProviders(),
        ...OrchestratorCoreModule.registerComponents(components),
      ],
    };
  }

  /**
   * Use this to provide custom components for {@link OrchestratorCoreModule}
   */
  static registerComponents(
    components: ComponentRegistry<OrchestratorDynamicComponentType>,
  ): Provider[] {
    return [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: components,
        multi: true,
      },
      { provide: COMPONENTS, useValue: components, multi: true },
    ];
  }

  private static getRootProviders(): Provider[] {
    return [
      { provide: ErrorStrategy, useClass: ThrowErrorStrategy },
      ...INJECTOR_MAP_PROVIDERS,
      ComponentLocatorService,
      ConfigurationService,
    ];
  }
}
