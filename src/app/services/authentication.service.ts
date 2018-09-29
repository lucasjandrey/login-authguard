import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storate: Storage, private plataform: Platform) {
    this.plataform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storate.get(TOKEN_KEY).then(result =>{
      if (result) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }

  login() {
    this.storate.set(TOKEN_KEY, '123456').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storate.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
