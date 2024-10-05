import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Services } from 'src/app/interfaces/services';
import { GlobaleService } from 'src/app/services/globale.service';

@Component({
  selector: 'app-service-button-add',
  templateUrl: './service-button-add.component.html',
  styleUrls: ['./service-button-add.component.scss'],
})
export class ServiceButtonAddComponent {
  @Output() serviceAdded = new EventEmitter<void>();

  constructor(
    private globalService: GlobaleService,
    private alertController: AlertController
  ) {}

  async addClickService() {
    const alert = await this.alertController.create({
      header: 'Ajouter un nouveau service',
      inputs: [
        {
          name: 'titre',
          type: 'textarea',
          placeholder: 'Nom de la Prestation',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Ajouter',
          handler: (data: { titre: string }) => {
            if (data.titre) {
              const newService: Services = {
                titre: data.titre,
                id: 0,
              };
              this.storeService(newService);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  storeService(service: Services) {
    this.globalService.storeService(service).subscribe({
      next: (response) => {
        console.log('Nouveau service ajouté avec succès', response);
        this.serviceAdded.emit();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du service", error);
      },
    });
  }
}
