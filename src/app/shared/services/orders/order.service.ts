import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { shippingAdress } from '../../interfaces/data';
import { Observable, retryWhen } from 'rxjs';
import { checkOutSessionResponse } from '../../interfaces/checkOutSessionResponse';
import { UserOrdersRes } from '../../interfaces/user-orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private get userTokenHeader() {
    return {
      token: typeof window !== 'undefined' ? (localStorage.getItem('userToken') || ' ') : ' '
    };
  }
  constructor(private _HttpClient: HttpClient) { }
    checkOrder(cartId:string, data:shippingAdress):Observable<checkOutSessionResponse> {
    return this._HttpClient.post<checkOutSessionResponse>(`${Environment.baseUrl}api/v1/orders/checkout-session/${cartId}?url=${Environment.SiteURL}`, data, { headers :this.userTokenHeader })
  }
    checkOrderCash(cartId:string, data:shippingAdress):Observable<checkOutSessionResponse> {
    return this._HttpClient.post<checkOutSessionResponse>(`${Environment.baseUrl}api/v1/orders/${cartId}`, data, {headers :this.userTokenHeader})
  } 
  getUserOrders(UserId :string):Observable<UserOrdersRes>{
    return this._HttpClient.get<UserOrdersRes>(`${Environment.baseUrl}api/v1/orders/user/${UserId}`)
  }
}

