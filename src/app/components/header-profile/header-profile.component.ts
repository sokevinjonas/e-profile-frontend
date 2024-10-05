import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaleService } from 'src/app/services/globale.service';
import { IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent {
  @Input() bioProfile: string = '';

  constructor(
    public authService: AuthService,
    private globalService: GlobaleService,
    private alertController: AlertController
  ) {}

  async storeBio() {
    const alert = await this.alertController.create({
      header: 'Modifier la Biographie',
      inputs: [
        {
          name: 'bio',
          type: 'textarea',
          placeholder: 'Entrez votre nouvelle biographie',
          value: this.bioProfile,
          attributes: {
            rows: 2,
            cols: 1,
            maxlength: 50,
          },
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (data) => {
            if (data.bio) {
              this.updateBio(data.bio);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  updateBio(newBio: string) {
    this.globalService.updateBioProfile(newBio).subscribe({
      next: (response) => {
        console.log('Biographie mise à jour avec succès', response);
        this.bioProfile = newBio;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la biographie', error);
      },
    });
  }
}
