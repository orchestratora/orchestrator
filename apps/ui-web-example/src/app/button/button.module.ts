import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@orchestrator/layout';
import { UiWebModule } from '@orchestrator/ui-web';

import { SharedModule } from '../shared/shared.module';
import { ButtonComponent } from './button.component';
import { LayoutButtonComponent } from './layout-button/layout-button.component';
import { SimpleButtonComponent } from './simple-button/simple-button.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ButtonComponent },
      { path: 'simple', component: SimpleButtonComponent },
      { path: 'layout', component: LayoutButtonComponent },
    ]),
    LayoutModule.forRoot(),
    UiWebModule.forRoot(),
  ],
  declarations: [ButtonComponent, SimpleButtonComponent, LayoutButtonComponent],
})
export class ButtonModule {}
