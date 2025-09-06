import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './shared-modules/material/material.module';
import { SwiperModule } from 'swiper/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './translate/translate-loader';
import { SharedModule } from './shared/shared.module';
import { LanguageCurrencyInterceptor } from './core/interceptors/language-currency.interceptor';
import { RouterModule } from '@angular/router';
import { LoaderInterceptor } from './core/interceptors/loader/loader.interceptor';
import { LoaderService } from './core/services/loader/loader.service';
import { LanguageService } from './core/services/language.service';
import { TranslationService } from './core/services/Translation/translation.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundInterceptor } from './core/interceptors/not-found.interceptor';
import { AllCarsComponent } from './pages/all-cars/all-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AllCarsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LayoutsModule,
    MaterialModule,
    SwiperModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LanguageCurrencyInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotFoundInterceptor,
      multi: true
    },
    LoaderService,
    LanguageService,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
