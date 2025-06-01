import { Routes } from '@angular/router';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { SendcodeformComponent } from './layout/pages/sendcodeform/sendcodeform.component';
import { RepasswordComponent } from './layout/additions/repassword/repassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ShippingAdressComponent } from './layout/additions/shipping-adress/shipping-adress.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
    { path: 'brands', component: BrandsComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgetpassword', component: ForgetpasswordComponent },
    { path: 'sendcode', component: SendcodeformComponent },
    { path: 'repassword', component: RepasswordComponent },
    { path: 'shippingaddress/:cartId', component: ShippingAdressComponent ,  canActivate: [authGuard] },
    { path: 'productdetails/:productId', component: ProductDetailsComponent, canActivate: [authGuard] },
    { path: '**', component: NotfoundComponent }, //wildCard (wrong path)
];
