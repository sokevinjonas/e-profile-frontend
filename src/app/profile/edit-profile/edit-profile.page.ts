import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public alertButtons: any[] = [];
  public services: string[] = [];
  public currentServiceIndex: number | null = null; // Index du service en cours de modification
  profileDescription: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing';

  constructor(protected authService: AuthService) {}

  // Inputs pour l'alert
  public alertInputs = [
    {
      name: 'titre', // Nom de l'input pour récupérer la saisie
      placeholder: 'Nom de la Prestation',
      type: 'textarea',
      attributes: {
        maxlength: 50,
      },
    },
  ];
  editUser() {}
  ngOnInit() {
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
            this.services[this.currentServiceIndex] = data.titre;
            this.currentServiceIndex = null; // Réinitialiser l'index
          }
        },
      },
    ];
  }

  // Méthode pour sélectionner un service à modifier
  editService(index: number) {
    this.currentServiceIndex = index; // Enregistrer l'index du service sélectionné
    // Préremplir l'alerte avec le service sélectionné
    const serviceToEdit = this.services[index];
    this.alertInputs[0].name = serviceToEdit; // Assigner la valeur au champ input de l'alerte

    // Afficher l'alerte
    setTimeout(() => {
      const alert = document.querySelector('ion-alert');
      if (alert) {
        alert.present();
      }
    });
  }

  // Méthode pour ajouter un service
  addClickService() {
    const newServiceIndex = this.services.length + 1;
    this.services.push(
      `Service ${newServiceIndex}: Lorem ipsum dolor sit amet consectetur.`
    );
  }

  // Supprime le service à l'index spécifié
  deleteService(i: number) {
    // Vérifier si l'index est valide
    if (i > -1 && i < this.services.length) {
      // Utiliser splice pour supprimer l'élément
      this.services.splice(i, 1);
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
}
