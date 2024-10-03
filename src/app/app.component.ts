import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Users } from './interfaces/users';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getInfoUser(); // Récupérer les informations de l'utilisateur
    console.log(
      "Informations de l'utilisateur:",
      this.authService.getInfoUser()
    );
  }
}
