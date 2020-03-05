import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DisplayConfigComponent } from './display-config/display-config.component';
import { EditableComponent } from './editable/editable.component';

@NgModule({
  declarations: [DisplayConfigComponent, EditableComponent],
  exports: [DisplayConfigComponent, EditableComponent],
  imports: [CommonModule],
})
export class SharedModule {}
