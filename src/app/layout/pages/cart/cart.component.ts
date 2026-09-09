import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/getLoggedUserCart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _Toster = inject(ToastrService);

  data!: Data;
  isLoading = false;

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/cart');
    }
    this.getLoggedUserCart();
  }

  getLoggedUserCart(): void {
    this.isLoading = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.data = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this._Toster.error('Could not load your cart.');
      },
    });
  }

  updateProductCartCount(productId: string, count: number): void {
    if (count <= 0) {
      this.deleteProductFromCart(productId);
      return;
    }
    this._CartService.updateproductQuantity(productId, count.toString()).subscribe({
      next: (res) => (this.data = res.data),
      // Previously a raw `alert(err)`, which dumped the error object on the user.
      error: () => this._Toster.error('Could not update the quantity.'),
    });
  }

  deleteProductFromCart(productId: string): void {
    this._CartService.removeCartProduct(productId).subscribe({
      next: (res) => {
        this.data = res.data;
        this._Toster.success('Item removed from your cart.');
      },
      error: () => this._Toster.error('Could not remove this item.'),
    });
  }

  clearCartPage(): void {
    this._CartService.clearCartFromServer().subscribe({
      next: () => {
        this._CartService.clearLocalCart();
        this._CartService.getLoggedUserCart().subscribe({
          next: (res) => (this.data = res.data),
        });
        this._Toster.success('Cart cleared.');
      },
      error: () => this._Toster.error('Could not clear your cart.'),
    });
  }
}
