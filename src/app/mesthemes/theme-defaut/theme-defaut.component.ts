import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaleService } from 'src/app/services/globale.service';
import { ThemeDataService } from 'src/app/services/theme/theme-data.service';

@Component({
  selector: 'app-theme-defaut',
  templateUrl: './theme-defaut.component.html',
  styleUrls: ['./theme-defaut.component.scss'],
})
export class ThemeDefautComponent implements OnInit {
  constructor(
    public themeDataService: ThemeDataService,
    public global: GlobaleService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.themeDataService.getBioProfile();
    this.themeDataService.loadServices();
    this.themeDataService.loadSocialLink();
    // this.themeDataService.;
  }
}
