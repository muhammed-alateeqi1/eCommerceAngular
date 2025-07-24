import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  // if u wanna make operation on requests 
  let _NgxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService)
  _NgxSpinnerService.show();
  return next(req).pipe(finalize(()=>{
    _NgxSpinnerService.hide();
  }));
  // if u wanna make operation on responses 
};
