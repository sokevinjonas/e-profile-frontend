import { Injectable } from '@angular/core';
import { GlobaleService } from '../globale.service';
import { AuthService } from '../auth.service';
import { SocialLinks } from 'src/app/interfaces/social-links';
import { Services } from 'src/app/interfaces/services';

@Injectable({
  providedIn: 'root', // Ce service sera disponible dans toute l'application
})
export class ThemeDataService {
  bioProfile: any;
  services: Services[] = [];
  socialNetworks: SocialLinks[] = [];
  constructor(protected globaleService: GlobaleService) {}

  loadServices() {
    this.globaleService.getServices().subscribe({
      next: (response: any) => {
        console.log('Liste des services', response.data);
        this.services = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la recuperation', error);
      },
    });
  }
  loadSocialLink() {
    this.globaleService.getSocialLink().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.socialNetworks = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la recuperation', error);
      },
    });
  }
  getBioProfile() {
    this.globaleService.getBioProfile().subscribe({
      next: (response) => {
        this.bioProfile = response.data.bio;
      },
      error: (error) => {
        console.error('Erreur lors de la recuperation', error);
      },
    });
  }
  getIconName(platform: string): string {
    switch (platform) {
      case 'Facebook':
        return 'logo-facebook';
      case 'WhatsApp':
        return 'logo-whatsapp';
      case 'Instagram':
        return 'logo-instagram';
      case 'LinkedIn':
        return 'logo-linkedin';
      case 'YouTube':
        return 'logo-youtube';
      case 'Twitter':
        return 'logo-twitter';
      case 'TikTok':
        return 'logo-tiktok';
      case 'Pinterest':
        return 'logo-pinterest';
      case 'Telegram':
        return 'logo-telegram';
      case 'GitHub': // Vérifiez la casse ici
        return 'logo-github';
      default:
        return 'logo'; // Une icône par défaut si la plateforme n'est pas reconnue
    }
  }
  getIconColor(platform: string): string {
    switch (platform) {
      case 'Facebook':
        return '#1877F2'; // Couleur officielle de Facebook
      case 'WhatsApp':
        return '#25D366'; // Couleur officielle de WhatsApp
      case 'Instagram':
        return '#E1306C'; // Couleur officielle d'Instagram
      case 'LinkedIn':
        return '#0077B5'; // Couleur officielle de LinkedIn
      case 'YouTube':
        return '#FF0000'; // Couleur officielle de YouTube
      case 'Twitter':
        return '#1DA1F2'; // Couleur officielle de Twitter
      case 'TikTok':
        return '#69C9D0'; // Couleur principale de TikTok
      case 'Pinterest':
        return '#E60023'; // Couleur officielle de Pinterest
      case 'Telegram':
        return '#0088CC'; // Couleur officielle de Telegram
      case 'GitHub':
        return '#181717'; // Couleur officielle de GitHub (noir)
      default:
        return '#000000'; // Couleur par défaut
    }
  }
  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.log('URL non définie');
    }
  }
}
