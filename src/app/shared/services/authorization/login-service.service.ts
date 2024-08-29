import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { loginData } from '../../interfaces/data';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessSignin } from '../../interfaces/successSignin';
import { FieldSignin } from '../../interfaces/fieldSignin';
import { jwtDecode } from "jwt-decode";
import { decodedData } from '../../interfaces/decodedData';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class loginService {
   userData: BehaviorSubject<decodedData|null> = new BehaviorSubject<decodedData | null>(null) ;  
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    afterNextRender(()=>{ //works on browser only 
      if(localStorage.getItem('userToken')){
        this.decodeUserData();
        _Router.navigate([localStorage.getItem("currentPage")])
      }
    })

  }
  signIn(data:loginData): Observable<SuccessSignin | FieldSignin> {
    return this._HttpClient.post<SuccessSignin | FieldSignin>(`${Environment.baseUrl}/api/v1/auth/signin`, data);
  }

  decodeUserData(){
    const token = JSON.stringify(localStorage.getItem("userToken")) ;
    const decoded = jwtDecode<decodedData>(token);
    this.userData.next(decoded) 
    console.log(this.userData.getValue());
    
  }


}
