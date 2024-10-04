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
  public alertButtons: any[] = [];
  public currentServiceIndex: number | null = null;
  profileDescription: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing';
  bioProfile: string = '';

  constructor(
    protected authService: AuthService,
    protected globalService: GlobaleService,
    private alertController: AlertController
  ) {}

  public alertInputs = [
    {
      name: 'titre',
      placeholder: 'Nom de la Prestation',
      type: 'textarea',
      value: '',
      attributes: {
        maxlength: 50,
      },
    },
  ];

  ngOnInit() {
    this.loadServices();
    this.loadButtonService();
    this.getBioProfile();
  }

  loadButtonService() {
    this.alertButtons = [
      {
        text: 'Annuler',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: (data: { titre: string }) => {
          if (this.currentServiceIndex !== null && data.titre) {
            const updatedService =
              this.globalService.services[this.currentServiceIndex];
            updatedService.titre = data.titre;
            this.updateService(updatedService);
          }
        },
      },
    ];
  }

  async editService(serviceId: number) {
    const serviceIndex = this.globalService.services.findIndex(
      (service) => service.id === serviceId
    );

    if (serviceIndex !== -1) {
      this.currentServiceIndex = serviceIndex;
      const serviceToEdit = this.globalService.services[serviceIndex];

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
        buttons: this.alertButtons,
      });

      await alert.present();
    } else {
      console.error('Service non trouvé');
    }
  }

  updateService(service: Services) {
    this.globalService.updateService(service).subscribe({
      next: (response) => {
        console.log('Service mis à jour avec succès', response);
        this.loadServices();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du service', error);
      },
    });
  }

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
        this.loadServices();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du service", error);
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
        // Ici, pas de manipulation du tableau local, juste une confirmation
        // Optionnel : Recharge les services pour mettre à jour la liste depuis le serveur
        this.loadServices();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du service', error);
      },
    });
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
  // Méthode pour afficher l'alerte et modifier la biographie
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
              this.updateBio(data.bio); // Appeler la méthode pour mettre à jour la bio
            }
          },
        },
      ],
    });

    await alert.present();
  }

  updateBio(newBio: string) {
    console.log(newBio);

    this.globalService.updateBioProfile(newBio).subscribe({
      next: (response) => {
        console.log('Biographie mise à jour avec succès', response);
        this.bioProfile = newBio; // Mettre à jour la bio localement après succès
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la biographie', error);
        // Vous pouvez également afficher un message d'erreur à l'utilisateur ici
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
}
