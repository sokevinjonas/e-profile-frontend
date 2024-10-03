import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  services: string[] = [];
  profileDescription: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing';

  constructor() {}

  ngOnInit() {}
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
}
