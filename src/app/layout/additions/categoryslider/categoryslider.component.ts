import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../shared/interfaces/product';
import { CategoryService } from './../../../shared/services/categories/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.css'
})
export class CategorysliderComponent implements OnInit {
  isLoading:boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },

    },
    nav: true
  }
  categoryList!: Category[]
  constructor(private _CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.isLoading = true;
    this._CategoryService.getAllCategories().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.categoryList = response.data;
        console.log(this.categoryList);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);

      }
    })
  }

}
