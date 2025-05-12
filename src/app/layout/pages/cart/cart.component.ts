import { afterNextRender, Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/getLoggedUserCart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  data !: Data;
  constructor(private _CartService: CartService) { }
  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem('currentPage', '/cart')
    }
    this.getLoggedUserCart()
  }
  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next : res =>{
        this.data = res.data;
        console.log(res.data);
      }
    })
  }
}
