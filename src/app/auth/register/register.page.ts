import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator, // Appel du validateur
      }
    );
  }
  // Validateur pour vérifier si le mot de passe et la confirmation correspondent
  passwordMatchValidator: ValidatorFn = (
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  };
  ngOnInit() {}
  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true; // Indique le début du chargement
      const user: Users = this.registerForm.value; // Récupérez les valeurs du formulaire

      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.isLoading = false;
          this.route.navigate(['/login']);
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
          // Gérer les erreurs (afficher un message d'erreur)
          this.isLoading = false; // Arrêtez le chargement
        },
      });
    } else {
      console.log('Veuillez saisir tous les champs');
    }
  }
}
