import { afterNextRender, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/categories/category.service';
import { Category } from '../../../shared/interfaces/getLoggedUserCart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule , RouterLink ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  isLoading :boolean = false;
    categoryList!: Category[]
  constructor(private _CategoryService:CategoryService){}
  ngOnInit(): void {
    if(typeof localStorage != "undefined"){
      localStorage.setItem('currentPage','/categories')
    }
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
