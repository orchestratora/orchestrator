import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerControlsComponent } from './composer-controls.component';

@NgModule({
  imports: [CommonModule],
  exports: [ComposerControlsComponent],
  declarations: [ComposerControlsComponent],
})
export class ComposerControlsModule {}
