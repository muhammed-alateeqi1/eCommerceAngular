import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { CartFailedResponse, CartResponse } from '../../interfaces/cart-response';
import { LoggedUserCart } from '../../interfaces/getLoggedUserCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
userTokenHeader ={
        token : localStorage.getItem('userToken') || ' '
}
  constructor(private _HttpClient:HttpClient) { }  
  addProductToCart(ProductId:string):Observable<CartResponse | CartFailedResponse> {
    console.log("ProductAddedToCart")
   return this._HttpClient.post<CartResponse | CartFailedResponse>(`${Environment.baseUrl}api/v1/cart` , {productId: ProductId} , {headers : this.userTokenHeader})
  }
  getLoggedUserCart():Observable<LoggedUserCart>{
    return this._HttpClient.get<LoggedUserCart>(`${Environment.baseUrl}api/v1/cart`, { headers: this.userTokenHeader });
  }
}
