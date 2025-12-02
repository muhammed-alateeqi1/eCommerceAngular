import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { loginService } from '../../../shared/services/authorization/login-service.service';
import { LogoutService } from '../../../shared/services/authorization/logout.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  cartCount = 0;
  logOut() {
    throw new Error('Method not implemented.');
  }
  isLogin: boolean = false;
  isLogout: boolean = false;
  constructor(public _loginService: loginService, public _LogoutService: LogoutService, private _FlowbiteService: FlowbiteService, private _CartService: CartService) { }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this._loginService.userData.subscribe({
      next: () => {
        if (this._loginService.userData.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })
    this._CartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    })
  }


}
