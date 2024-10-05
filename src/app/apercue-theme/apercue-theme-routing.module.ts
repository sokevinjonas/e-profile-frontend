import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApercueThemePage } from './apercue-theme.page';
import { ThemeDefautComponent } from '../mesthemes/theme-defaut/theme-defaut.component';
import { Theme1Component } from '../mesthemes/theme-1/theme-1.component';

const routes: Routes = [
  {
    path: 'apercu',
    component: ApercueThemePage,
    children: [
      { path: 'defaut', component: ThemeDefautComponent },
      { path: '1', component: Theme1Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApercueThemePageRoutingModule {}
