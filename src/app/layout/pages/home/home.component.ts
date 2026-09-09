import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from '../../additions/categoryslider/categoryslider.component';
import { HomesliderComponent } from '../../../additions/homeslider/homeslider.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorysliderComponent,
    HomesliderComponent,
    ProductCardComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _Toster = inject(ToastrService);

  userWord = '';
  productList: product[] = [];
  isLoading = false;

  /** Placeholder tiles rendered while the product request is in flight. */
  readonly skeletons = Array.from({ length: 12 });

  /**
   * Filtered in the component rather than through the `search` pipe in the
   * template, so the list is evaluated once per change detection pass instead
   * of once per binding that needs it.
   */
  get visibleProducts(): product[] {
    const term = this.userWord.trim().toLowerCase();
    if (!term) return this.productList;
    return this.productList.filter((item) => item.title.toLowerCase().includes(term));
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home');
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
