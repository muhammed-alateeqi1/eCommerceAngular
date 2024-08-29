import { afterNextRender, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    if(typeof localStorage != "undefined"){
      localStorage.setItem('currentPage','/cart')
    }
  }
}
