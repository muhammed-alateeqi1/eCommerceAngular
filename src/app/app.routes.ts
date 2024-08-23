import { Routes } from '@angular/router';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' , pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'cart',component:CartComponent},
    {path:'categories',component:CategoriesComponent},
    {path:'products',component:ProductsComponent},
    {path:'brands',component:BrandsComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'**',component:NotfoundComponent}, //wildCard (wrong path)
];
    