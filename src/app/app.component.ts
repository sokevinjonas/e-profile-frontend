import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Users } from './interfaces/users';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {
    this.showSplash();
  }

  ngOnInit() {
    this.authService.getInfoUser(); // Récupérer les informations de l'utilisateur
    console.log(
      "Informations de l'utilisateur:",
      this.authService.getInfoUser()
    );
  }
  async showSplash() {
    await SplashScreen.show({
      showDuration: 3000,
      autoHide: true,
    });
  }
}
