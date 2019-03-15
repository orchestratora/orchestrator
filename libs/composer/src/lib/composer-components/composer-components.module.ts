import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerComponentsComponent } from './composer-components.component';

@NgModule({
  imports: [CommonModule],
  exports: [ComposerComponentsComponent],
  declarations: [ComposerComponentsComponent],
})
export class ComposerComponentsModule {}
