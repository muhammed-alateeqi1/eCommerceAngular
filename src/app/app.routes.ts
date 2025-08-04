import { Routes } from '@angular/router';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { SendcodeformComponent } from './layout/pages/sendcodeform/sendcodeform.component';
import { RepasswordComponent } from './layout/additions/repassword/repassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ShippingAdressComponent } from './layout/additions/shipping-adress/shipping-adress.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';
import { ShippingAddressCashComponent } from './layout/additions/shipping-address-cash/shipping-address-cash.component';
import { CategoryProductsComponent } from './layout/pages/category-products/category-products.component';
import { SettingsModule } from './settings/settings.module';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path: 'cart', loadComponent: () => import('./layout/pages/cart/cart.component').then((c) => c.CartComponent), canActivate: [authGuard] },
    { path: 'categories', loadComponent: () => import('./layout/pages/categories/categories.component').then((c) => c.CategoriesComponent), canActivate: [authGuard] },
    { path: 'products', loadComponent: () => import('./layout/pages/products/products.component').then((c) => c.ProductsComponent), canActivate: [authGuard] },
    { path: 'brands', loadComponent: () => import('./layout/pages/brands/brands.component').then((c) => c.BrandsComponent), canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'settings', loadChildren: ()=> import('./settings/settings.module').then((m)=>m.SettingsModule) , canActivate: [authGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'forgetpassword', component: ForgetpasswordComponent },
    { path: 'sendcode', component: SendcodeformComponent },
    { path: 'repassword', component: RepasswordComponent },
    { path: 'allorders', component: AllordersComponent, canActivate: [authGuard]},
    { path: 'shippingaddress/:cartId', component: ShippingAdressComponent },
    { path: 'shippingaddresscash/:cartId', component: ShippingAddressCashComponent },
    { path: 'productdetails/:productId', component: ProductDetailsComponent, canActivate: [authGuard] },
    { path: 'category/:id', component: CategoryProductsComponent, canActivate: [authGuard] },
    { path: '**', component: NotfoundComponent }, //wildCard (wrong path)
];
