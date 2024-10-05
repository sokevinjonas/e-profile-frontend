import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApercueThemePageRoutingModule } from './apercue-theme-routing.module';

import { ApercueThemePage } from './apercue-theme.page';
import { ThemeDefautComponent } from '../mesthemes/theme-defaut/theme-defaut.component';
import { Theme1Component } from '../mesthemes/theme-1/theme-1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApercueThemePageRoutingModule,
  ],
  declarations: [ApercueThemePage, ThemeDefautComponent, Theme1Component],
})
export class ApercueThemePageModule {}
