import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { ComposerDroppableModule } from '../composer-droppable';
import { ComposerCanvasComponent } from './composer-canvas.component';

@NgModule({
  imports: [CommonModule, OrchestratorCoreModule, ComposerDroppableModule],
  exports: [ComposerCanvasComponent],
  declarations: [ComposerCanvasComponent],
})
export class ComposerCanvasModule {}
