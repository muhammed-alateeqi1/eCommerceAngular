import { afterNextRender, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  ngOnInit(): void {
    if(typeof localStorage != "undefined"){
      localStorage.setItem('currentPage','/brands')
    }
  }
}
