import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerCanvasModule } from './composer-canvas';
import { ComposerComponentsModule } from './composer-components';
import { ComposerConfigModule } from './composer-config';
import { ComposerConfiguratorModule } from './composer-configurator';
import { ComposerControlsModule } from './composer-controls';
import { ComposerErrorsModule } from './composer-errors';
import { ComposerPreviewModule } from './composer-preview';
import { ComposerComponent } from './composer.component';

@NgModule({
  imports: [
    CommonModule,
    ComposerCanvasModule,
    ComposerComponentsModule,
    ComposerPreviewModule,
    ComposerConfigModule,
    ComposerErrorsModule,
    ComposerControlsModule,
    ComposerConfiguratorModule,
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
export class ComposerModule {}
