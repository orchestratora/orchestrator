import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    NzIconModule,
    NzPopoverModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    OrchestratorCoreModule.withComponents([ComposerDroppableComponent]),
    ComposerConfiguratorModule,
  ],
  exports: [ComposerDroppableComponent],
  declarations: [ComposerDroppableComponent],
})
export class ComposerDroppableModule {}
