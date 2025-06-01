import { afterNextRender, Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/getLoggedUserCart';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  data !: Data;
  cartItems: any[] = [];
  isLoading: boolean = false;
  constructor(private _CartService: CartService) { }
  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem('currentPage', '/cart')
    }
    this._CartService.cartItems$.subscribe(items => {
    this.cartItems = items;
  });
    this.getLoggedUserCart()
  }
  getLoggedUserCart() {
    this.isLoading = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: res => {
        this.data = res.data;
        this.isLoading = false;
        console.log(res.data);
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
  deleteProductFromCart(productId: string) {
    this._CartService.removeCartProduct(productId).subscribe({
      next: res => {
        this.data = res.data;
        // console.log(res);
      }
    })
  }
clearCartPage() {
  this._CartService.clearCartFromServer().subscribe({
    next: () => {
      this._CartService.clearLocalCart();
      this._CartService.getLoggedUserCart().subscribe(res => {
        this.data = res.data; 
      });
    },
    error: (err) => {
      console.error('Error clearing cart from server:', err);
    }
  });
}
}
