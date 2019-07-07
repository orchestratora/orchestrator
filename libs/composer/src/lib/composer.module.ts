import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ComponentRegistry,
  ErrorStrategy,
  OrchestratorCoreModule,
  OrchestratorDynamicComponentType,
  SuppressErrorStrategy,
} from '@orchestrator/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { ComposerCanvasModule } from './composer-canvas';
import { ComposerComponentsModule } from './composer-components';
import { ComposerConfigModule } from './composer-config';
import { ComposerConfiguratorModule } from './composer-configurator';
import { ComposerConfiguratorService } from './composer-configurator/composer-configurator.service';
import { ComposerControlsModule } from './composer-controls';
import { ComposerDroppableModule } from './composer-droppable';
import { ComposerErrorsModule } from './composer-errors';
import { ComposerPreviewModule } from './composer-preview';
import { ComposerComponent } from './composer.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
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
  providers: [],
})
export class ComposerModule {
  static forRoot(): ModuleWithProviders<ComposerModule> {
    return {
      ngModule: ComposerModule,
      providers: [
        ComposerConfiguratorService,
        { provide: ErrorStrategy, useClass: SuppressErrorStrategy },
      ],
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
