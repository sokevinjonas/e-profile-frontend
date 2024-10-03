import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par votre URL API
  private tokenKey = 'auth_token'; // Clé pour stocker le token

  constructor(private http: HttpClient) {}

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retourne true si le token est présent
  }

  // Récupérer le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Stocker le token dans le localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Méthode pour se connecter
  login(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Méthode pour s'inscrire
  register(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Méthode pour déconnecter
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Supprime le token
  }
}
