import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../shared/services/categories/category.service';
import { Category } from '../../../shared/interfaces/getLoggedUserCart';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoryService = inject(CategoryService);

  isLoading = false;
  categoryList: Category[] = [];

  readonly skeletons = Array.from({ length: 8 });

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/categories');
    }
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.isLoading = true;
    this._CategoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categoryList = response.data;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }
}
