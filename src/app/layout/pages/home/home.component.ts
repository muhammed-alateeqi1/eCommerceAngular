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
  constructor(private _ProductService: ProductService) { }
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

}
