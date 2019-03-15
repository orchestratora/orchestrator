import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComposerModule } from '@orchestrator/composer';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { DefaultComponent } from './default.component';

@NgModule({
  imports: [
    CommonModule,
    OrchestratorCoreModule.forRoot(),
    ComposerModule.forRoot(),
    RouterModule.forChild([{ path: '', component: DefaultComponent }]),
  ],
  declarations: [DefaultComponent],
})
export class DefaultModule {}
