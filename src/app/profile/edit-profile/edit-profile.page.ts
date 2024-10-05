import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/interfaces/services';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaleService } from 'src/app/services/globale.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  bioProfile: string = '';

  constructor(public globalService: GlobaleService) {}

  ngOnInit() {
    this.loadServices();
    this.getBioProfile();
  }

  loadServices() {
    this.globalService.getServices().subscribe({
      next: (response: any) => {
        console.log('Liste des services', response.data);
        this.globalService.services = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la recuperation', error);
      },
    });
  }

  getBioProfile() {
    this.globalService.getBioProfile().subscribe({
      next: (response) => {
        this.bioProfile = response.data.bio;
      },
    });
  }

  onServicesChanged() {
    this.loadServices();
  }
}
