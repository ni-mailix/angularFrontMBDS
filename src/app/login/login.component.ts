import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 // champs du formulaire
username!:  string;
password! : string;

constructor(private authService: AuthService,
            private router:Router) { }

onSubmit(event: any) {
  // On vérifie que les champs ne sont pas vides
  if (this.username === "") return ; 
  if (this.password === "") return; 


  // on demande au service de vérifier les informations pour se connecter (login/password)
  this.authService.logIn(this.username,this.password)
  .subscribe((resp: any) => {
    if (resp.auth==false){
      this.authService.loggedIn = false;
    }
    else if (resp.auth==true){
      localStorage.setItem('access_token', resp.token);
      localStorage.setItem('username',this.username);
      this.authService.loggedIn = true;
      this.router.navigate(["/home"]);
    }
    else {
      this.authService.loggedIn = false;
    }
  })
}
}
