import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import {
  AllowedValuesComponent,
  allowedValuesProvider,
} from './allowed-values';
import { rangeConfigProvider } from './config/range';
import { requiredConfigProvider } from './config/required';
import { FormControlNameEx } from './form-control-name-ex.directive';
import {
  IntegerComponent,
  integerProvider,
  numberProvider,
  rangeIndefiniteProvider,
} from './integer';
import { RangeComponent, rangeProvider } from './range';
import { SwitchComponent, switchProvider } from './switch';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
  ],
  exports: [],
  declarations: [
    FormControlNameEx,
    AllowedValuesComponent,
    IntegerComponent,
    RangeComponent,
    SwitchComponent,
  ],
  entryComponents: [
    AllowedValuesComponent,
    IntegerComponent,
    RangeComponent,
    SwitchComponent,
  ],
})
export class DecoratorConfigModule {
  static forRoot(): ModuleWithProviders<DecoratorConfigModule> {
    return {
      ngModule: DecoratorConfigModule,
      providers: [
        requiredConfigProvider,
        rangeConfigProvider,
        numberProvider,
        integerProvider,
        rangeIndefiniteProvider,
        rangeProvider,
        allowedValuesProvider,
        switchProvider,
      ],
    };
  }
}
