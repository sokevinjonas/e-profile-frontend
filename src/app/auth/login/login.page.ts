import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}
  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const user = this.loginForm.value;
      this.authService.login(user).subscribe({
        next: (response) => {
          console.log('Utilisateur connecté', response.data);
          this.isLoading = false;
          this.route.navigate(['/tabs/tab1']);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion', error);
          this.isLoading = false;
        },
      });
    }
  }
}
