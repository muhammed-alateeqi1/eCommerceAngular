import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { loginService } from '../../../shared/services/authorization/login-service.service';
import { LogoutService } from '../../../shared/services/authorization/logout.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  isLogout:false = false;
  constructor(public _loginService:loginService , public _LogoutService:LogoutService ){}

  ngOnInit(): void {
    this._loginService.userData.subscribe({
      next:()=>{
        if(this._loginService.userData.getValue() != null){
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      }
    })
  }


}
