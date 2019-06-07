import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';

import { ComposerComponentsComponent } from './composer-components.component';

@NgModule({
  imports: [CommonModule, NzListModule],
  exports: [ComposerComponentsComponent],
  declarations: [ComposerComponentsComponent],
})
export class ComposerComponentsModule {}
