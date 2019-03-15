import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerCanvasModule } from './composer-canvas/composer-canvas.module';
import { ComposerComponentsModule } from './composer-components/composer-components.module';
import { ComposerConfigModule } from './composer-config/composer-config.module';
import { ComposerControlsModule } from './composer-controls/composer-controls.module';
import { ComposerErrorsModule } from './composer-errors/composer-errors.module';
import { ComposerPreviewModule } from './composer-preview/composer-preview.module';
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
