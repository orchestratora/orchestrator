import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
      },
      {
        path: 'default',
        loadChildren: './default/default.module#DefaultModule',
      },
    ]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
