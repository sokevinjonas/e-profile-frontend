import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par votre URL API
  // private tokenKey = 'auth_token'; // Clé pour stocker le token

  constructor(private http: HttpClient) {}

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  // Méthode pour s'inscrire
  register(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
