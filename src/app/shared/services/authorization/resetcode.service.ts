import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetCode } from '../../interfaces/data';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetcodeService {
constructor(private _httpClient:HttpClient , private _Router:Router) { }
  resetCodeFunc(resetCode:resetCode):Observable<resetCode>{
    return this._httpClient.post<resetCode>(`${Environment.baseUrl}api/v1/auth/verifyResetCode`, resetCode);
  }
}
