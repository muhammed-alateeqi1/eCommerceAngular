import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: product;
constructor(private _ProductService:ProductService , private _ActivatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
      this.getProductById();
  }
  getProductById(){
    let id!:string;
    this._ActivatedRoute.params.subscribe({
      next : product=>{
        id = product['productId'];
        // console.log(product['productId']);
      },
      error: err =>{
        console.log(err.message);
      }
    })
    this._ProductService.getProductById(id).subscribe({
      next : res =>{
        this.product = res.data;
        console.log(res.data);
      }
    })
  }
}
