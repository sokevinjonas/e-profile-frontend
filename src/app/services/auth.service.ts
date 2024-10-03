import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par votre URL API
  private tokenKey = 'auth_token'; // Clé pour stocker le token
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.checkToken()
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.checkToken();
  }
  // Méthode pour gérer la réponse de connexion
  handleLoginResponse(response: any): void {
    localStorage.setItem(this.tokenKey, response.token); // Stocke le token
    this.isAuthenticatedSubject.next(true); // Met à jour l'état d'authentification
  }
  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  // Vérifie si le token est présent et valide
  private checkToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Retourne true si le token existe
  }
}
