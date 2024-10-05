import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SocialLinks } from 'src/app/interfaces/social-links';
import { GlobaleService } from 'src/app/services/globale.service';

interface AvailableSocialNetwork {
  name: string;
  icon: string;
  domain: string;
}

@Component({
  selector: 'app-social-grid',
  templateUrl: './social-grid.component.html',
  styleUrls: ['./social-grid.component.scss'],
})
export class SocialGridComponent {
  @Input() socialNetworks: SocialLinks[] = [];
  availableSocialNetworks: AvailableSocialNetwork[] = [
    { name: 'Facebook', icon: 'logo-facebook', domain: 'facebook.com' },
    { name: 'WhatsApp', icon: 'logo-whatsapp', domain: 'whatsapp.com' },
    { name: 'Instagram', icon: 'logo-instagram', domain: 'instagram.com' },
    { name: 'LinkedIn', icon: 'logo-linkedin', domain: 'linkedin.com' },
    { name: 'YouTube', icon: 'logo-youtube', domain: 'youtube.com' },
    { name: 'Twitter', icon: 'logo-twitter', domain: 'twitter.com' },
    { name: 'TikTok', icon: 'logo-tiktok', domain: 'tiktok.com' },
    { name: 'Pinterest', icon: 'logo-pinterest', domain: 'pinterest.com' },
    { name: 'Telegram', icon: 'logo-telegram', domain: 'telegram.org' },
    { name: 'GitHub', icon: 'logo-github', domain: 'github.com' },
  ];

  constructor(
    private alertController: AlertController,
    protected globalService: GlobaleService
  ) {}

  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.log('URL non définie');
    }
  }

  async addSocialNetwork() {
    const alert = await this.alertController.create({
      header: 'Ajouter un Réseau Social',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'URL du profil (ex: https://www.github.com/votreprofil)',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Ajouter',
          handler: (data) => {
            const detectedNetwork = this.detectSocialNetwork(data.url);
            if (detectedNetwork) {
              const newNetwork: SocialLinks = {
                platform: detectedNetwork.name,
                url: data.url, // Assurez-vous que l'URL est bien formatée
              };

              // Appel au service pour stocker le lien social
              this.globalService.storeSocialLink(newNetwork).subscribe({
                next: (response) => {
                  console.log(
                    'Réseau social enregistré avec succès:',
                    response
                  );
                  // Mettez à jour localement les réseaux sociaux si nécessaire
                  this.socialNetworks.push(newNetwork); // Assurez-vous que socialNetworks est bien référencé
                },
                error: (error) => {
                  console.error(
                    "Erreur lors de l'enregistrement du réseau social:",
                    error
                  );
                },
              });
            } else {
              console.log('Réseau social non reconnu');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  detectSocialNetwork(url: string): { name: string; icon: string } | undefined {
    const network = this.availableSocialNetworks.find((network) =>
      url.includes(network.domain)
    );
    return network ? { name: network.name, icon: network.icon } : undefined;
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
}
