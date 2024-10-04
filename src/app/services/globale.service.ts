import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../interfaces/services';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GlobaleService {
  private apiUrl = environment.apiUrl;
  services: Services[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour récupérer les services depuis l'API
  getServices(): Observable<Services[]> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    console.log('En-têtes de la requête:', headers);
    return this.http.get<Services[]>(`${this.apiUrl}services`, { headers });
  }
}
