import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerDroppableComponent } from './composer-droppable.component';

/**
 * @internal
 */
@NgModule({
  imports: [CommonModule],
  exports: [ComposerDroppableComponent],
  declarations: [ComposerDroppableComponent],
})
export class ComposerDroppableModule {}
