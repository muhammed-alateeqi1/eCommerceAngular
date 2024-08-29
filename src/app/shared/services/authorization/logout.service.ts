import { Injectable } from '@angular/core';
import { loginService } from './login-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(public _loginService:loginService , private _Router:Router) { }
  logOut(){
    localStorage.removeItem('userToken');
    this._loginService.userData.next(null) //behaviourSubject (rxjs) to listen Login Compnent Changes
    this._Router.navigate(["/login"])
  }
}
