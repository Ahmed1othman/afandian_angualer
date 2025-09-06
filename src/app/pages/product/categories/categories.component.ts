import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { CategoriesSection } from 'src/app/Models/home.model';
import { HomeService } from 'src/app/services/home/home.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  categoriesSection!: CategoriesSection;
  categorySlug: string | undefined;
  categoryDetails: any = { category: {}, cars: [] }; // Initialize with empty objects
  currentLang: string = 'en';
  translations: Record<string, string> = {};
  swiperConfig: any = {
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
    private homeService: HomeService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private sharedDataService: SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTranslations();
    this.currentLang = this.languageService.getCurrentLanguage();
    
    const brandsSubscription = this.sharedDataService.categories$.subscribe((category) => {
      if (category) {
        this.categoriesSection = category;
        this.cdr.detectChanges();
      }
    });
    this.subscriptions.add(brandsSubscription);

    const routeSubscription = this.route.params.subscribe(params => {
      if (params['slug']) {
        this.categorySlug = params['slug'];
        // Reset category details before loading new ones
        this.categoryDetails = { category: {}, cars: [] };
        this.cdr.detectChanges();
        this.getBrandBySlug();
      }
    });
    this.subscriptions.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadTranslations(): void {
    const translationSubscription = this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
      this.cdr.detectChanges();
    });
    this.subscriptions.add(translationSubscription);
  }

  getBrandBySlug() {
    if (this.categorySlug) {
      const categorySubscription = this.homeService.getCaategoryDetails(this.categorySlug).subscribe(
        (res: any) => {
          this.categoryDetails = res;
          if (isPlatformServer(this.platformId) || isPlatformBrowser(this.platformId)) {
            this.seo.setMetaTags(this.categoryDetails.category.seo_data, 'category');
          }
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error loading category details:', error);
          this.categoryDetails = { category: {}, cars: [] };
          this.cdr.detectChanges();
        }
      );
      this.subscriptions.add(categorySubscription);
    }
  }
}
