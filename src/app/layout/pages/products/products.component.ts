import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _Toster = inject(ToastrService);

  userWord = '';
  productList: product[] = [];
  isLoading = false;

  readonly skeletons = Array.from({ length: 12 });

  get visibleProducts(): product[] {
    const term = this.userWord.trim().toLowerCase();
    if (!term) return this.productList;
    return this.productList.filter((item) => item.title.toLowerCase().includes(term));
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/products');
    }
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this._Toster.error('Could not load products. Please try again.');
      },
    });
  }

  addProductToCart(productId: string): void {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: any) => this._Toster.success(response.message, '', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      }),
      error: () => this._Toster.error('Could not add this product to your cart.'),
    });
  }
}
