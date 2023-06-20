import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private http:HttpClient) { 
  }

  /* Users dans la base de donnees avec leur name/mdp valides
  users = [
    { 
      id: 1,
      name: 'Andre',
      password: 'andre',
      role: 'user'
    },
    {
      id: 2,
      name: 'Princia',
      password: 'princia',
      role: 'user'
    },
    {
      id: 3,
      name: 'John',
      password: 'john',
      role: 'admin'
    }
  ];*/
  
  uri_api = 'https://mbds-api.onrender.com/api/login';
  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  logIn(name:string, password:string) :Observable<any> {
    console.log("ON SE LOGGE")
    return this.http.post(this.uri_api, {name, password})
  }

  logOut() {
    console.log("ON SE DELOGGE")
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.loggedIn = false;
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
        resolve(this.loggedIn);
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }
}
