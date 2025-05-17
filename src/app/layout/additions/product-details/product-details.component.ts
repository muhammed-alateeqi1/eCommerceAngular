import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule , OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
    customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: true
  }
  isLoading: boolean = false;
  product!: product;
  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    this.isLoading = true;
    let id!: string;
    this._ActivatedRoute.params.subscribe({
      next: product => {
        id = product['productId'];
        // console.log(product['productId']);
      },
      error: err => {
        console.log(err.message);
      }
    })
    this._ProductService.getProductById(id).subscribe({
      next: res => {
        this.product = res.data;
        console.log(res.data);
        this.isLoading = false;
      }
    })
  }
}
