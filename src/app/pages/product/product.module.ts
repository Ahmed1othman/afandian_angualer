import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { SharedModule } from "../../shared/shared.module";
import { SwiperModule } from 'swiper/angular';
import { AccordionModule } from 'primeng/accordion';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { OnlyUsComponent } from './only-us/only-us.component'; // Import FormsModule
import { ImageModule } from 'primeng/image';
import { LocationComponent } from './location/location.component';
@NgModule({
  declarations: [
    ProductFilterComponent,
    ProductShowComponent,
    BrandsComponent,
    CategoriesComponent,
    OnlyUsComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    GalleriaModule,
    CardModule,
    SharedModule,
    SwiperModule,
    AccordionModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FormsModule,
    ImageModule
]
})
export class ProductModule { }
