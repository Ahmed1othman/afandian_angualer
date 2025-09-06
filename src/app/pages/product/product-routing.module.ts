import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  // Redirect old URLs to new structure
  { path: 'product/car/:slug', redirectTo: '/product/:slug', pathMatch: 'full' },
  { path: 'product/category/:slug', redirectTo: '/category/:slug', pathMatch: 'full' },
  { path: 'product/brand/:slug', redirectTo: '/brand/:slug', pathMatch: 'full' },
  { path: 'product/filter', redirectTo: '/all-cars', pathMatch: 'full' },
  { path: 'product/location/:slug', redirectTo: '/location/:slug', pathMatch: 'full' },

  // This route was causing conflicts with the app-level routing
  // { path: ':slug', redirectTo: '/product/:slug', pathMatch: 'full' },
  { path: 'cars-rental-dubai/categories/:slug', redirectTo: '/category/:slug', pathMatch: 'full' },
  { path: 'cars-rental-dubai/brands/:slug', redirectTo: '/brand/:slug', pathMatch: 'full' },
  { path: 'cars-rental-dubai/search-your-car', redirectTo: '/all-cars', pathMatch: 'full' },
  { path: 'cars-rental-dubai/locations/:slug', redirectTo: '/location/:slug', pathMatch: 'full' },




  // { path: ':slug', component: ProductShowComponent }, // Car details
  // { path: 'cars-rental-dubai/search-your-car', component: ProductFilterComponent }, // Filter
  // { path: 'cars-rental-dubai/brands/:slug', component: BrandsComponent }, // Brands
  // { path: 'cars-rental-dubai/categories/:slug', component: CategoriesComponent }, // Categories
  // { path: 'cars-rental-dubai/locations/:slug', component: LocationComponent }, // Locations
  // New SEO-friendly URLs

  { path: 'product/:slug', component: ProductShowComponent }, // Car details
  { path: 'all-cars', component: ProductFilterComponent }, // All cars
  { path: 'brand/:slug', component: BrandsComponent }, // Brands
  { path: 'category/:slug', component: CategoriesComponent }, // Categories
  { path: 'location/:slug', component: LocationComponent }, // Locations
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
