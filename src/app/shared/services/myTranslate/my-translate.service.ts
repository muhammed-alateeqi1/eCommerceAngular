import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private _TranslateService: TranslateService , @Inject(PLATFORM_ID) plateformId:object) {
    if (isPlatformBrowser(plateformId)) {
      //1.declare var : set defualt lang
      let defualtLang = 'en';
      //2. get lang from local storage 
      let savedLange = localStorage.getItem('lang');
      //check on saveLang : true > change the defualt lang 
      if (savedLange) {
        defualtLang = savedLange;
      }
      //4. set the defualt lang 
      _TranslateService.setDefaultLang(defualtLang)
      //5. set use lang
      _TranslateService.use(defualtLang)

      this.changeDireaction(defualtLang);
    }
  }
  changeDireaction(lang:string) {
    if (lang === 'en')
      document.dir = 'ltr';
    else if (lang === 'ar') {
      document.dir = 'rtl';
    }
  }
}

