import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService , private _Toster:ToastrService) { }

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
  alerResponse(resMessage: string) {
    this._Toster.success(resMessage, '', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,

    })
  }
  addProductToCartFromProductDetails() {
    this._CartService.addProductToCart(this.product._id).subscribe({
      next: response => {
        this.alerResponse(response.message);
      },error : err=>{
        this.alerResponse(err.message);
      }
    })
  }
}
