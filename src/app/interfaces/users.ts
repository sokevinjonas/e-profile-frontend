export interface Users {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  profile_image: string;
  password_confirmation?: string;
  created_at?: string;
}
