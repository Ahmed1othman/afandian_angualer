import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { BrandsSection } from 'src/app/Models/home.model';
import { HomeService } from 'src/app/services/home/home.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnDestroy{
  
  private subscriptions: Subscription = new Subscription();
  brandsSection!: BrandsSection;
  brandSlug: string | undefined;
  brandDetails:any;
  currentLang: string = 'en';
  translations: Record<string, string> = {};
  swiperBrand: any = {
    breakpoints: {
      320: { slidesPerView: 3.10 },
      480: { slidesPerView: 3.10 },
      640: { slidesPerView: 4.10 },
      768: { slidesPerView: 5.10 },
      1024: { slidesPerView:6.10 },
      1280: { slidesPerView: 7.10 }

    }
  };

  constructor(
    private homeService:HomeService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private sharedDataService:SharedDataService,
    private seoService: SeoService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

  ngOnInit(): void {
    this.loadTranslations();
    this.currentLang = this.languageService.getCurrentLanguage();
    const brandsSubscription = this.sharedDataService.brands$.subscribe((brands) => {
      if (brands) {
        this.brandsSection = brands;
      }
    });

    this.subscriptions.add(brandsSubscription);
    this.route.params.subscribe(params => {
      this.brandSlug = this.route.snapshot.params['slug'];
      this.getBrandBySlug();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadTranslations(): void {
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
  }

  getBrandBySlug(){
    if(this.brandSlug){
      this.homeService.getBrandDetails(this.brandSlug).subscribe((res: any) => {
        this.brandDetails = res;
        if (isPlatformServer(this.platformId)) {
          this.seoService.setMetaTags(this.brandDetails.brands.seo_data,'brands');
        }
        if (isPlatformBrowser(this.platformId)) {
          this.seoService.setMetaTags(this.brandDetails.brands.seo_data,'brands');
        }
      },
      (error) => {
      });
    }
    
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
