import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { BannerHeadComponent } from './components/banner-head/banner-head.component';
import { CardBlogComponent } from './components/card-blog/card-blog.component';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from './components/language/language.component';
import { SearchComponent } from './components/search/search.component';
import { GalleriaModule } from 'primeng/galleria';
import { CurrencyComponent } from './components/currency/currency.component';
import { SwiperModule } from 'swiper/angular';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    CardComponent,
    BannerHeadComponent,
    CardBlogComponent,
    LanguageComponent,
    SearchComponent,
    CurrencyComponent,
    ScrollToTopComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    CarouselModule,
    RouterModule,
    GalleriaModule,
    SwiperModule
  ],
  exports: [
    CardComponent,
    BannerHeadComponent,
    CardBlogComponent,
    LanguageComponent,
    SearchComponent,
    CurrencyComponent,
    ScrollToTopComponent
  ],
})
export class SharedModule { }
