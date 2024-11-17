import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from "../../additions/categoryslider/categoryslider.component";
import { HomesliderComponent } from "../../../additions/homeslider/homeslider.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorysliderComponent, HomesliderComponent,RouterLink], // Add necessary Angular modules here if needed
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
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
