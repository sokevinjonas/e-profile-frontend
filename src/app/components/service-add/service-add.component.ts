import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Services } from 'src/app/interfaces/services';
import { GlobaleService } from 'src/app/services/globale.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss'],
})
export class ServiceAddComponent {
  @Input() services: Services[] = [];
  @Output() servicesChanged = new EventEmitter<void>();

  constructor(
    private globalService: GlobaleService,
    private alertController: AlertController
  ) {}

  async editService(serviceId: number) {
    const serviceIndex = this.services.findIndex(
      (service) => service.id === serviceId
    );

    if (serviceIndex !== -1) {
      const serviceToEdit = this.services[serviceIndex];

      const alert = await this.alertController.create({
        header: 'Modifier le service',
        inputs: [
          {
            name: 'titre',
            type: 'textarea',
            placeholder: 'Nom de la Prestation',
            value: serviceToEdit.titre,
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
          },
          {
            text: 'OK',
            handler: (data: { titre: string }) => {
              if (data.titre) {
                const updatedService = { ...serviceToEdit, titre: data.titre };
                this.updateService(updatedService);
              }
            },
          },
        ],
      });

      await alert.present();
    }
  }

  updateService(service: Services) {
    this.globalService.updateService(service).subscribe({
      next: (response) => {
        console.log('Service mis à jour avec succès', response);
        this.servicesChanged.emit();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du service', error);
      },
    });
  }

  async deleteService(service: Services) {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: `Êtes-vous sûr de vouloir supprimer le service "${service.titre}" ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.confirmDeleteService(service);
          },
        },
      ],
    });

    await alert.present();
  }

  confirmDeleteService(service: Services) {
    this.globalService.deleteService(service).subscribe({
      next: () => {
        console.log('Service supprimé avec succès');
        this.servicesChanged.emit();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du service', error);
      },
    });
  }
}
