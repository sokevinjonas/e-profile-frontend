import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-grid',
  templateUrl: './social-grid.component.html',
  styleUrls: ['./social-grid.component.scss'],
})
export class SocialGridComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  openLink(url: string) {
    window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
  }

  addSocialNetwork() {
    console.log('Ajouter un Réseau Social');
    // Logique pour ajouter un réseau social peut être implémentée ici
  }
}
