import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Users } from '../interfaces/users';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Remplacez par votre URL API
  private tokenKey = 'auth_token'; // Clé pour stocker le token
  userInfo: Users | null = null;
  constructor(private http: HttpClient, private route: Router) {}

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // const token = this.getToken();
    const token = this.getInfoUser();
    if (!token) {
      return false; // Pas de token, donc non authentifié
    }

    // Vérifiez si le token est expiré
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    if (token.exp && currentTime >= token.exp) {
      return false; // Le token a expiré
    }
    return !!token; // Retourne true si le token est présent
  }

  // Récupérer le token depuis le localStorage
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    // console.log('Token récupéré:', token); // Ajoutez ceci pour vérifier le token
    return token;
  }

  // Stocker le token dans le localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Méthode pour se connecter
  login(user: Users): Observable<any> {
    // intercepter la réponse de l'API après la connexion
    return this.http.post(`${this.apiUrl}login`, user).pipe(
      tap((response: any) => {
        // Vérifier si le token est présent dans la réponse
        if (response && response.access_token) {
          this.setToken(response.access_token); // Stocker le token
        }
      })
    );
  }
  // Méthode pour obtenir les informations de l'utilisateur à partir du token
  getInfoUser(): any {
    const token = this.getToken();
    if (token) {
      try {
        return (this.userInfo = jwtDecode(token)); // Décode le token et retourne les données
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }
    return null; // Retourne null si pas de token
  }

  // Méthode pour s'inscrire
  register(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, user);
  }

  // Méthode pour déconnecter
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Supprime le token
    this.route.navigate(['/login']);
  }
}
