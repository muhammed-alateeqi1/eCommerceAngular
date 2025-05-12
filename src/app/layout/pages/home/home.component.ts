import { Data } from './../../../shared/interfaces/ProductDetails';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from "../../additions/categoryslider/categoryslider.component";
import { HomesliderComponent } from "../../../additions/homeslider/homeslider.component";
import { RouterLink } from '@angular/router';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from "../../../shared/pipes/search.pipe";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorysliderComponent,FormsModule, HomesliderComponent, RouterLink, OnsalePipe, LowerCasePipe, CurrencyPipe, SearchPipe], // Add necessary Angular modules here if needed
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
  userWord:string = '';
  
  productList !:product[]
  isLoading: boolean = false;
  constructor(private _ProductService: ProductService , private _CartService:CartService , private _Toster:ToastrService) { }
  ngOnInit(): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem('currentPage', '/home');
    }
    this.Products()
  }
  Products() {
    this.isLoading = true;
    this._ProductService.getAllProducts().subscribe({
      next :(res) =>{
        this.productList = res.data;
        this.isLoading = false;

      },
      error : (err) =>{
        this.isLoading = false;
        console.log(err);
      }
    })
  }
  showSuccess(resMessage: string){
    this._Toster.success(resMessage , '' , {
      timeOut : 3000,
      progressBar  : true,
      closeButton : true,
      
    })
  }
  addProductToCart(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next : response => {
        console.log(response.message);
        let resMessage = response.message
        this.showSuccess(resMessage);
      }
    })
  }

}
