import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterNextRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    if(typeof localStorage != "undefined"){
      localStorage.setItem('currentPage','/home')
    }

    
  }
}
