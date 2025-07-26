import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  if (typeof localStorage != 'undefined') {
    let userTokenHeader = {
      token: localStorage.getItem('userToken')!
    }
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
      req = req.clone({
        setHeaders: userTokenHeader,
      })
    }
  }
  return next(req);
};