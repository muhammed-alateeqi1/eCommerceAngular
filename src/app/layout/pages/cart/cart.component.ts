import { afterNextRender, Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/getLoggedUserCart';
import { log } from 'console';

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
      next: res => {
        this.data = res.data;
        // console.log(res.data);
      }
    })
  }
  updateProductCartCount(productId: string, count: number) {
    if (count <= 0) {
     this.deleteProductFromCart(productId)
    } else {
      this._CartService.updateproductQuantity(productId, count.toString()).subscribe({
        next: res => {
          console.log(res);
          this.data = res.data;
        },
        error: err => {
          alert(err)
        }
      })
    }
  }
  deleteProductFromCart(productId:string){
    this._CartService.removeCartProduct(productId).subscribe({
     next : res =>{
      this.data = res.data;
        // console.log(res);
        
      }
    })
  }
}
