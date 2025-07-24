import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const toastr = inject(ToastrService);
  return next(req).pipe(catchError((err)=>{

    console.log('error from interceptor', err);
    
  toastr.error(err.error.message || 'حدث خطأ ما');
    return throwError(() => err )
  }));

};
