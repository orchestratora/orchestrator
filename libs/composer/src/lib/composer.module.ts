import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ComponentRegistry,
  OrchestratorCoreModule,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { ComposerCanvasModule } from './composer-canvas';
import { ComposerComponentsModule } from './composer-components';
import { ComposerConfigModule } from './composer-config';
import { ComposerConfiguratorModule } from './composer-configurator';
import { ComposerControlsModule } from './composer-controls';
import { ComposerDroppableModule } from './composer-droppable';
import { ComposerErrorsModule } from './composer-errors';
import { ComposerPreviewModule } from './composer-preview';
import { ComposerComponent } from './composer.component';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    OrchestratorCoreModule,
    ComposerCanvasModule,
    ComposerComponentsModule,
    ComposerPreviewModule,
    ComposerConfigModule,
    ComposerErrorsModule,
    ComposerControlsModule,
    ComposerConfiguratorModule,
    ComposerDroppableModule,
  ],
  exports: [
    ComposerCanvasModule,
    ComposerComponentsModule,
    ComposerPreviewModule,
    ComposerConfigModule,
    ComposerErrorsModule,
    ComposerControlsModule,
    ComposerComponent,
  ],
  declarations: [ComposerComponent],
})
export class ComposerModule {
  static forRoot(): ModuleWithProviders<ComposerModule> {
    return {
      ngModule: ComposerModule,
    };
  }

  static withComponents(
    components: ComponentRegistry<OrchestratorDynamicComponentType>,
  ): ModuleWithProviders<ComposerModule> {
    return {
      ngModule: ComposerModule,
      providers: [OrchestratorCoreModule.registerComponents(components)],
    };
  }
}
