import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartFailedResponse, CartResponse } from '../../interfaces/cart-response';
import { LoggedUserCart } from '../../interfaces/getLoggedUserCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _HttpClient = inject(HttpClient);

  private cartItems = new BehaviorSubject<any[]>(this.loadCartFromStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Sync cartItems with localStorage on every change
    this.cartItems$.subscribe(items => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(items));
      }
    });
  }


  // this step dosen't matter after using setHeaderInterceptors 

  // private get userTokenHeader() {
  //   return {
  //     token: typeof window !== 'undefined' ? (localStorage.getItem('userToken') || ' ') : ' '
  //   };
  // }

  private loadCartFromStorage(): any[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  }

  // addProductToCart(ProductId: string): Observable<CartResponse | CartFailedResponse> {
  //   const currentItems = this.cartItems.getValue();
  //   const updatedItems = [...currentItems, ProductId];
  //   this.cartItems.next(updatedItems);

  //   return this._HttpClient.post<CartResponse | CartFailedResponse>(
  //     `${Environment.baseUrl}api/v1/cart`,{ productId: ProductId },
  //   );
  // }
  // 1
addProductToCart(ProductId: string) {
  return this._HttpClient
    .post<CartResponse | CartFailedResponse>(
      `${Environment.baseUrl}api/v1/cart`,
      { productId: ProductId }
    )
    .pipe(
      tap((res: any) => {
        this.cartItems.next(res.data.products);
      })
    );
}

  // getLoggedUserCart(): Observable<LoggedUserCart> {
  //   return this._HttpClient.get<LoggedUserCart>(
  //     `${Environment.baseUrl}api/v1/cart`,
  //   );
  // }

//2
getLoggedUserCart() {
  return this._HttpClient.get<LoggedUserCart>(
    `${Environment.baseUrl}api/v1/cart`
  ).pipe(
    tap(res => {
      this.cartItems.next(res.data.products);
    })
  );
}

  // updateproductQuantity(productId: string, count: string): Observable<LoggedUserCart> {
  //    const currentItems = this.cartItems.getValue();
  //   const updatedItems = [...currentItems, productId];
  //   this.cartItems.next(updatedItems);
  //   return this._HttpClient.put<LoggedUserCart>(
  //     `${Environment.baseUrl}api/v1/cart/${productId}`,
  //     { count: count },
  //   );
  // }

  //3
 updateproductQuantity(productId: string, count: string) {
  return this._HttpClient.put<LoggedUserCart>(
    `${Environment.baseUrl}api/v1/cart/${productId}`,
    { count }
  ).pipe(
    tap(res => {
      this.cartItems.next(res.data.products);
    })
  );
}

  // removeCartProduct(productId: string): Observable<LoggedUserCart> {
  //   return this._HttpClient.delete<LoggedUserCart>(
  //     `${Environment.baseUrl}api/v1/cart/${productId}`,
  //   ).pipe(
  //     tap(response => {
  //       console.log(response);
  //       const currentItems = this.cartItems.getValue();
  //       const updatedItems = currentItems.filter(id => id !== productId);
  //       this.cartItems.next(updatedItems);
  //     })
  //   );
  // }
  removeCartProduct(productId: string) {
  return this._HttpClient.delete<LoggedUserCart>(
    `${Environment.baseUrl}api/v1/cart/${productId}`
  ).pipe(
    tap(res => {
      this.cartItems.next(res.data.products);
    })
  );
}

    clearLocalCart() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartItems');
      this.cartItems.next([]);  
    }
  }
  clearCartFromServer(): Observable<any> {
  return this._HttpClient.delete(`${Environment.baseUrl}api/v1/cart`);
}



}



