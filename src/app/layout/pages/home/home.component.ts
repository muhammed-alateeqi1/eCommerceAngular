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
    constructor(@Inject(PLATFORM_ID) private x:object){
        console.log('hello form constructor')
      afterNextRender(()=>{
        console.log(document.title + 'from afterNextRender');
      })
      }
    ngOnInit(): void {
      console.log("hi from on init");
      if(typeof document != 'undefined'){
        console.log(document.title , "hello from ng oninit");
      }
      if(isPlatformBrowser(this.x)){
        console.log(document.title , 'isPlatformBrowser');
      }
      if(isPlatformServer(this.x)){
        console.log('hello from server','isPlatformServer ');
      }
    }
}
