import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { email } from '../../interfaces/data';
import { Observable } from 'rxjs';
import { forgetPasswordResponse } from '../../interfaces/ForgetPassword';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) {}
  forgetPassword(data:email):Observable<forgetPasswordResponse>
  {
    return this._HttpClient.post<forgetPasswordResponse>(`${Environment.baseUrl}api/v1/auth/forgotPasswords` , data);
  }

}
