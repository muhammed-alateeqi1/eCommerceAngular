/**
 * PRACTICE MODULE - not part of the shipped storefront.
 *
 * This feature exists only as an exercise in classic Angular NgModules and lazy
 * `loadChildren` routing, to contrast with the standalone-component approach the
 * rest of the app uses. Its three pages (hr / sales / marketing) render
 * placeholder text.
 *
 * The `settings` route in `app.routes.ts` and the navbar link are commented out,
 * so nothing here is reachable or bundled. Kept for reference; uncomment that
 * route to re-enable it.
 */
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
