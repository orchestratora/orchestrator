import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerPreviewComponent } from './composer-preview.component';

@NgModule({
  imports: [CommonModule],
  exports: [ComposerPreviewComponent],
  declarations: [ComposerPreviewComponent],
})
export class ComposerPreviewModule {}
