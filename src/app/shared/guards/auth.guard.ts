import { CanActivateFn, Router } from '@angular/router';
import { loginService } from '../services/authorization/login-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _loginService:loginService = inject(loginService);
  let _Router:Router = inject(Router);
  if(_loginService.userData.getValue() != null){
    return true;
  }
   _Router.navigate(['/login'])
  return false;
};
