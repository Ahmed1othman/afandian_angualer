import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { BrandsSection, CategoriesSection } from 'src/app/Models/home.model';
import { HomeService } from 'src/app/services/home/home.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  private subscriptions: Subscription = new Subscription();
  brandsSection!: BrandsSection;
  brandSlug: string | undefined;
  locationDetails:any;
  currentLang: string = 'en';
  categoriesSection!: CategoriesSection;

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
    private homeService:HomeService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private sharedDataService:SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService
  ){}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    const brandsSubscription = this.sharedDataService.brands$.subscribe((brands) => {
      if (brands) {
        this.brandsSection = brands;
      }
    });
    const categoriesSections = this.sharedDataService.categories$.subscribe((category) => {
      if (category) {
        this.categoriesSection = category;
      }
    });

    this.subscriptions.add(brandsSubscription);
    this.subscriptions.add(categoriesSections);

    this.route.params.subscribe(params => {
      this.brandSlug = this.route.snapshot.params['slug'];
      this.getBrandBySlug();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  getBrandBySlug(){
    if(this.brandSlug){
      this.homeService.getlocationDetails(this.brandSlug).subscribe((res: any) => {
        this.locationDetails = res;
        if (isPlatformServer(this.platformId)) {
          this.seo.setMetaTags(this.locationDetails.location.seo_data,'location');
        }
        if (isPlatformBrowser(this.platformId)) {
          this.seo.setMetaTags(this.locationDetails.location.seo_data,'location');
        }
      },
      (error) => {
      });
    }
    
  }
}
