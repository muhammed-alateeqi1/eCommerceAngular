

import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/brands.service';
import { BrandsRes, Daum } from '../../../shared/interfaces/BrandsRes';

@Component({
  standalone: true,
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Daum[] = [];
  loading: boolean = true;

  constructor(private _BrandService: BrandService) { }

  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem('currentPage', '/brands')
    }
    this.getAllbrands()
  }
  getAllbrands() {
    this._BrandService.getAllBrands().subscribe({
      next: (res: BrandsRes) => {
        this.brands = res.data;
        this.loading = false;
        console.log(res.data);

      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
