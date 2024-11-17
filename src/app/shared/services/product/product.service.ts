import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../interfaces/product';
import { ProductDetailsRes } from '../../interfaces/ProductDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }
  getAllProducts():Observable<ProductResponse>{
   return this._HttpClient.get<ProductResponse>(`${Environment.baseUrl}api/v1/products`);
  }
  getProductById(productId:string):Observable<ProductDetailsRes>{
   return this._HttpClient.get<ProductDetailsRes>(`${Environment.baseUrl}api/v1/products/${productId}`)
  }
}
