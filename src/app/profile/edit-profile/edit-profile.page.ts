import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/interfaces/services';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaleService } from 'src/app/services/globale.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public alertButtons: any[] = [];
  public currentServiceIndex: number | null = null; // Index du service en cours de modification
  profileDescription: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing';

  constructor(
    protected authService: AuthService,
    protected globalService: GlobaleService
  ) {}

  // Inputs pour l'alert
  public alertInputs = [
    {
      name: 'titre', // Nom de l'input pour récupérer la saisie
      placeholder: 'Nom de la Prestation',
      type: 'textarea',
      value: 'Test ici',
      attributes: {
        maxlength: 50,
      },
    },
  ];
  editUser() {}
  ngOnInit() {
    this.loadServices();
    this.lodButtonService();
  }

  lodButtonService() {
    this.alertButtons = [
      {
        text: 'Annuler',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: (data: { titre: string }) => {
          // Log du texte saisi par l'utilisateur
          console.log('Valeur saisie :', data.titre);

          // Modifier la saisie à l'index du service courant
          if (this.currentServiceIndex !== null && data.titre) {
            this.globalService.services[this.currentServiceIndex].titre =
              data.titre;
            this.currentServiceIndex = null; // Réinitialiser l'index
          }
        },
      },
    ];
  }
  // Méthode pour sélectionner un service à modifier
  editService(serviceId: number) {
    // Trouver le service correspondant à l'ID
    const serviceIndex = this.globalService.services.findIndex(
      (service) => service.id === serviceId
    );

    if (serviceIndex !== -1) {
      this.currentServiceIndex = serviceIndex; // Enregistrer l'index du service sélectionné
      const serviceToEdit = this.globalService.services[serviceIndex];

      // Préremplir l'alerte avec le service sélectionné
      this.alertInputs[0].name = serviceToEdit.titre; // Assigner la valeur au champ input de l'alerte

      // Afficher l'alerte
      setTimeout(() => {
        const alert = document.querySelector('ion-alert');
        if (alert) {
          alert.present();
        }
      });
    } else {
      console.error('Service non trouvé');
    }
  }

  // Méthode pour ajouter un service
  addClickService() {
    const newService: Services = {
      id: this.globalService.services.length + 1, // Assurez-vous que l'ID est unique
      titre: `Service ${
        this.globalService.services.length + 1
      }: Lorem ipsum dolor sit amet consectetur.`,
      // Ajoutez d'autres propriétés si nécessaire
    };
    this.globalService.services.push(newService); // Ajoutez l'objet nouvellement créé
  }

  // Supprime le service à l'index spécifié
  deleteService(i: number) {
    // Vérifier si l'index est valide
    if (i > -1 && i < this.globalService.services.length) {
      // Utiliser splice pour supprimer l'élément
      this.globalService.services.splice(i, 1);
    }
  }
  public userFormsAlerte = [
    {
      type: 'text',
      placeholder: 'Nom',
    },
    {
      type: 'text',
      placeholder: 'Prenom',
    },

    {
      type: 'textarea',
      placeholder: 'A propos de Vous?',
    },
  ];
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
}
