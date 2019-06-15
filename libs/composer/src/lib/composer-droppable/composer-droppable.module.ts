import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { ComposerDroppableComponent } from './composer-droppable.component';

/**
 * @internal
 */
@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    OrchestratorCoreModule.withComponents([ComposerDroppableComponent]),
  ],
  exports: [ComposerDroppableComponent],
  declarations: [ComposerDroppableComponent],
})
export class ComposerDroppableModule {}
