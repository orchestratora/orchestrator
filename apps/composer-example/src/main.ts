import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { en_US, NZ_I18N } from 'ng-zorro-antd';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(en);

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      { provide: LOCALE_ID, useValue: 'en-US' },
      { provide: NZ_I18N, useValue: en_US },
    ],
  })
  .catch(err => console.error(err));
