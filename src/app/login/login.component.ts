import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    // Vérification des informations d'identification
    if (this.authService.logIn()) {
      // Redirection vers la page d'accueil si les informations d'identification sont valides
      this.router.navigate(['/home']);
    } else {
      // Affichage d'un message d'erreur si les informations d'identification sont incorrectes
      console.log('Identifiants incorrects');
    }
  }
}
