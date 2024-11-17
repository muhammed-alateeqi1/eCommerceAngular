import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../interfaces/allCategories';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  getAllCategories():Observable<CategoryResponse>{
    return this._HttpClient.get<CategoryResponse>(`${Environment.baseUrl}api/v1/categories`)
  }
}
