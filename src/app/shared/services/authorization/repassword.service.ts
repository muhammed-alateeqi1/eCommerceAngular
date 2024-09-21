import { rePasswordData } from './../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { loginService } from './login-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { decodedData } from '../../interfaces/decodedData';

@Injectable({
  providedIn: 'root'
})
export class RepasswordService {
  userData: any;
  constructor(private _HttpClient:HttpClient , private _loginService:loginService , private _Router:Router) { }
  rePassword(rePasswordData:rePasswordData):Observable<rePasswordData>{
    return this._HttpClient.put<rePasswordData>(`${Environment.baseUrl}api/v1/auth/resetPassword` , rePasswordData)
  }
  navigateToLogin(){
    this._Router.navigate(["/login"])
  }
  
  decodeUserData(){
    const token = JSON.stringify(localStorage.getItem("userToken")) ;
    const decoded = jwtDecode<decodedData>(token);
    this.userData.next(decoded) 
    console.log(this.userData.getValue());
  }
  }

