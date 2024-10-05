import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';
import { ServiceAddComponent } from 'src/app/components/service-add/service-add.component';
import { ServiceButtonAddComponent } from 'src/app/components/service-button-add/service-button-add.component';
import { SocialGridComponent } from 'src/app/components/social-grid/social-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    EditProfilePage,
    HeaderProfileComponent,
    ServiceAddComponent,
    ServiceButtonAddComponent,
    SocialGridComponent,
  ],
})
export class EditProfilePageModule {}
