import { Component, OnInit } from '@angular/core';
import { GlobaleService } from 'src/app/services/globale.service';

@Component({
  selector: 'app-theme-defaut',
  templateUrl: './theme-defaut.component.html',
  styleUrls: ['./theme-defaut.component.scss'],
})
export class ThemeDefautComponent implements OnInit {
  constructor(public globalService: GlobaleService) {}

  ngOnInit() {}
}
