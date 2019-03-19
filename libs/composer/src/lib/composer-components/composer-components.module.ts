import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ComposerComponentsComponent } from './composer-components.component';

@NgModule({
  imports: [CommonModule, NgZorroAntdModule],
  exports: [ComposerComponentsComponent],
  declarations: [ComposerComponentsComponent],
})
export class ComposerComponentsModule {}
