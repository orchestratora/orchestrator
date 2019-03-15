import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerCanvasComponent } from './composer-canvas.component';

@NgModule({
  imports: [CommonModule],
  exports: [ComposerCanvasComponent],
  declarations: [ComposerCanvasComponent],
})
export class ComposerCanvasModule {}
