import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { HrComponent } from './hr/hr.component';
import { SalesComponent } from './sales/sales.component';
import { MarketingComponent } from './marketing/marketing.component';


@NgModule({
  declarations: [HrComponent,SalesComponent,MarketingComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})



export class SettingsModule { }
