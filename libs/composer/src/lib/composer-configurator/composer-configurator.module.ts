import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { ComposerConfiguratorComponent } from './composer-configurator.component';

/**
 * @internal
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    DynamicModule,
  ],
  exports: [ComposerConfiguratorComponent],
  declarations: [ComposerConfiguratorComponent],
})
export class ComposerConfiguratorModule {}
