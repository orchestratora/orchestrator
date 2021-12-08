import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'button',
    loadChildren: () =>
      import('./button/button.module').then((m) => m.ButtonModule),
  },
  {
    path: 'stepper',
    loadChildren: () =>
      import('./stepper/stepper.module').then((m) => m.StepperExampleModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
