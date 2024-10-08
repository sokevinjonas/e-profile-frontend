import { Component, OnInit } from '@angular/core';
import { GlobaleService } from 'src/app/services/globale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  bioProfile: string = '';

  constructor(public globalService: GlobaleService, private router: Router) {}
  navigateToComponent() {
    this.router.navigate(['/theme/apercu/defaut']);
  }
  ngOnInit() {
    this.loadServices();
    this.getBioProfile();
    this.loadSocialLink();
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
  loadSocialLink() {
    this.globalService.getSocialLink().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.globalService.socialNetworks = response.data;
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
      error: (error) => {
        console.error('Erreur lors de la recuperation', error);
      },
    });
  }

  onServicesChanged() {
    this.loadServices();
  }
}
