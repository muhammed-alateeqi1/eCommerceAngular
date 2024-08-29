import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerData } from '../../interfaces/data';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { successRegister } from '../../interfaces/successSignUp';
import { FiledRegister } from '../../interfaces/FiledSignup';

@Injectable({
  providedIn: 'root'
})
export class SignupAuthService {
  constructor(private _HttpClient: HttpClient) {}

  signUp(data:registerData): Observable<successRegister | FiledRegister> {
    return this._HttpClient.post<successRegister | FiledRegister>(`${Environment.baseUrl}/api/v1/auth/signup`, data);
  }
}
