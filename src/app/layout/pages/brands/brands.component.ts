import { Component, OnInit, inject } from '@angular/core';
import { BrandService } from '../../../shared/services/brands.service';
import { BrandsRes, Daum } from '../../../shared/interfaces/BrandsRes';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  private readonly _BrandService = inject(BrandService);

  brands: Daum[] = [];
  loading = true;

  readonly skeletons = Array.from({ length: 10 });

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/brands');
    }
    this.getAllbrands();
  }

  getAllbrands(): void {
    this._BrandService.getAllBrands().subscribe({
      next: (res: BrandsRes) => {
        this.brands = res.data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
