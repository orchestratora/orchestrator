import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerErrorsComponent } from './composer-errors.component';

@NgModule({
  imports: [CommonModule],
  exports: [ComposerErrorsComponent],
  declarations: [ComposerErrorsComponent],
})
export class ComposerErrorsModule {}
