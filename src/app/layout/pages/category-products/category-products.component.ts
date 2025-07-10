import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  categoryId: string = '';
  products: product[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private _ProductService: ProductService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.loadProducts();
  }

  loadProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data.filter(
          (p: any) => p.category?._id === this.categoryId);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }
}


