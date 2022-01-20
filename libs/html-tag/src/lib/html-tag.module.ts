import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { HtmlTagComponent } from './html-tag/html-tag.component';
import { HtmlTextComponent } from './html-text/html-text.component';

@NgModule({
  imports: [OrchestratorCoreModule, CommonModule],
  exports: [HtmlTagComponent, HtmlTextComponent],
  declarations: [HtmlTagComponent, HtmlTextComponent],
})
export class HtmlTagModule {
  static forRoot(): ModuleWithProviders<HtmlTagModule> {
    return {
      ngModule: HtmlTagModule,
      providers: [
        ...OrchestratorCoreModule.registerComponents([
          HtmlTagComponent,
          HtmlTextComponent,
        ]),
      ],
    };
  }
}
