import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { SearchPipe } from "../../../shared/pipes/search.pipe";
import { RouterLink } from '@angular/router';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink, OnsalePipe, LowerCasePipe, CurrencyPipe, SearchPipe], // Add necessary Angular modules here if needed
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isLoading : boolean = false;
 productList !: product[]
  userWord: string = '';

  constructor(private _ProductService:ProductService , private _CartService: CartService, private _Toster: ToastrService){}
  ngOnInit(): void {
    if(typeof localStorage != "undefined"){
      localStorage.setItem('currentPage','/products')
    }
       this.Products()
  }
  Products() {
    this.isLoading = true;
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {      
        this.productList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }
    alertResponse(resMessage: string) {
    this._Toster.success(resMessage, '', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    })
  }
   addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: response => {
        console.log(response.message);
        this.alertResponse(response.message);
      }, error: err=>{
      this.alertResponse(err.message);
      }
    })
  } 
}