// src/app/services/brand.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandsRes } from '../interfaces/BrandsRes';
import { Environment } from '../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private _HttpClient: HttpClient) {}

    getAllBrands():Observable<BrandsRes>{
      return this._HttpClient.get<BrandsRes>(`${Environment.baseUrl}api/v1/brands`)
    }
}
