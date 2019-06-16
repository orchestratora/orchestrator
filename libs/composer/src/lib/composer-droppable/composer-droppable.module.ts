import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';

import { ComposerConfiguratorModule } from '../composer-configurator';
import { ComposerDroppableComponent } from './composer-droppable.component';

/**
 * @internal
 */
@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    NzInputModule,
    NzDividerModule,
    NzCollapseModule,
    OrchestratorCoreModule.withComponents([ComposerDroppableComponent]),
    ComposerConfiguratorModule,
  ],
  exports: [ComposerDroppableComponent],
  declarations: [ComposerDroppableComponent],
})
export class ComposerDroppableModule {}
