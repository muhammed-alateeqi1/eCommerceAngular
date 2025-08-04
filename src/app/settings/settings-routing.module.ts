import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr/hr.component';
import { SalesComponent } from './sales/sales.component';
import { MarketingComponent } from './marketing/marketing.component';

const routes: Routes = [
  {path:'',redirectTo : 'hr' , pathMatch : 'full'},
  {path:'hr',component :HrComponent},
  {path:'sales',component :SalesComponent},
  {path:'marketing',component :MarketingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { 
  
}
