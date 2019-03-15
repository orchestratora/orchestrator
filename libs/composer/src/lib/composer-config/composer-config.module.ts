import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerConfigComponent } from './composer-config.component';

@NgModule({
  imports: [CommonModule],
  exports: [ComposerConfigComponent],
  declarations: [ComposerConfigComponent],
})
export class ComposerConfigModule {}
