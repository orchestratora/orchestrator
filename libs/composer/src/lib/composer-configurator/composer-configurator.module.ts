import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComposerConfiguratorComponent } from './composer-configurator.component';

/**
 * @internal
 */
@NgModule({
  imports: [CommonModule],
  exports: [ComposerConfiguratorComponent],
  declarations: [ComposerConfiguratorComponent],
})
export class ComposerConfiguratorModule {}
