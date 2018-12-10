import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@orchestrator/layout';
import { UiWebModule } from '@orchestrator/ui-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, LayoutModule, UiWebModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
