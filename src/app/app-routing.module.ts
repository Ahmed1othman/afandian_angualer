import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BlogDetailsComponent } from './pages/blog/blog-details/blog-details.component';

const routes: Routes = [
  // Redirect old product/brand and product/category URLs to new structure
  {
    path: ':lang/product/brand/:slug',
    redirectTo: ':lang/brand/:slug',
    pathMatch: 'full'
  },
  {
    path: ':lang/product/category/:slug',
    redirectTo: ':lang/category/:slug',
    pathMatch: 'full'
  },
  // Base URL redirects to English home page
  { path: '', redirectTo: '/en', pathMatch: 'full' },
  
  // Special route to handle /en/home URL pattern
  { path: ':lang/home', redirectTo: ':lang', pathMatch: 'full' },

  // Special routes for blog URLs to prevent them from being captured by the car detail wildcard
  { path: ':lang/blogs/:slug', component: BlogDetailsComponent },
  { path: ':lang/blogs', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },


  

  
  { path: ':lang', children: [
    { path: '', component: HomeComponent },
    // This will redirect /en/home to /en
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'about-us', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
    { path: 'about', redirectTo: 'about-us', pathMatch: 'full' },
    
  
    // Updated car rental routes
    { path: '', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },

    { path: 'contact-us', loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },
    // Special route to handle old car detail URLs like /en/lamborghini-urus-2022-white-rental-in-dubai
    { path: ':carSlug', redirectTo: 'product/:carSlug', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
  ]},

  { path: '**', redirectTo: '/en' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
