import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface SocialNetwork {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-social-grid',
  templateUrl: './social-grid.component.html',
  styleUrls: ['./social-grid.component.scss'],
})
export class SocialGridComponent implements OnInit {
  socialNetworks: SocialNetwork[] = [
    {
      name: 'Facebook',
      icon: 'logo-facebook',
      url: 'https://www.facebook.com',
    },
    {
      name: 'WhatsApp',
      icon: 'logo-whatsapp',
      url: 'https://www.whatsapp.com',
    },
    {
      name: 'Instagram',
      icon: 'logo-instagram',
      url: 'https://www.instagram.com',
    },
    {
      name: 'LinkedIn',
      icon: 'logo-linkedin',
      url: 'https://www.linkedin.com',
    },
    { name: 'YouTube', icon: 'logo-youtube', url: 'https://www.youtube.com' },
  ];

  availableSocialNetworks: { name: string; icon: string; domain: string }[] = [
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

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

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
          placeholder:
            'URL du profil (ex: https://www.facebook.com/votreprofil)',
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
              const newNetwork: SocialNetwork = {
                name: detectedNetwork.name,
                icon: detectedNetwork.icon,
                url: data.url,
              };
              this.socialNetworks.push(newNetwork);
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
}
