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

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getServices(): Observable<Services[]> {
    return this.http.get<Services[]>(`${this.apiUrl}services`, {
      headers: this.getHeaders(),
    });
  }

  updateService(service: Services): Observable<any> {
    return this.http.put(`${this.apiUrl}services/${service.id}`, service, {
      headers: this.getHeaders(),
    });
  }
  storeService(service: Services): Observable<any> {
    return this.http.post(`${this.apiUrl}services`, service, {
      headers: this.getHeaders(),
    });
  }
  deleteService(service: Services): Observable<any> {
    return this.http.delete(`${this.apiUrl}services/${service.id}`, {
      headers: this.getHeaders(),
    });
  }
  updateBioProfile(bio: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}profile`,
      { bio },
      {
        // Encapsulation de la biographie dans un objet
        headers: this.getHeaders(),
      }
    );
  }
  getBioProfile(): Observable<any> {
    return this.http.get<Services[]>(`${this.apiUrl}profile`, {
      headers: this.getHeaders(),
    });
  }
}
