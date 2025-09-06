import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { ProductResource } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';


@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent {
  ProductSlug: string | undefined;
  productDetails: ProductResource | null = null;
  images: any[] | undefined;
  currentLang: string = 'en';
  numVisible: number = 5;
  responsiveOptions: any[];
  translations: Record<string, string> = {};
  activeIndex = 0;
  contactData:any;

  swiperCard: any = {
    breakpoints: {
      320: { slidesPerView: 1.10 },
      480: { slidesPerView: 2.10 },
      900: { slidesPerView: 3 },
      1100: { slidesPerView: 3.10 },
      1200: { slidesPerView: 3.10 },
      1400: { slidesPerView: 4 },
      1500: { slidesPerView: 4.10 },
      1800: { slidesPerView: 4.10 }


    }
  };
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private router: Router,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService,
    private sharedDataService: SharedDataService,


  ) {
    this.responsiveOptions = [
      {
        breakpoint: '320',
        numVisible: 3,          // Show only one image at a time
        slidesPerView: 1,       // One image per view
      },
      {
        breakpoint: '480',
        numVisible: 3,          // Show only one image at a time
        slidesPerView: 1,       // One image per view
      },
      {
        breakpoint: '900',
        numVisible: 3,          // Show three images at a time
        slidesPerView: 1        // Three images per view
      },
      {
        breakpoint: '1100',
        numVisible: 4,          // Show four images at a time
        slidesPerView: 1        // Four images per view
      }
    ];

  }
  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    this.route.params.subscribe(params => {
      this.ProductSlug = this.route.snapshot.params['slug'];
      this.getProductBySlug();
    });
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
    this.sharedDataService.currentWhatsapp.subscribe(data => {
      this.contactData = data || {}; // Get whatsapp from the service
    });
    this.updateNumVisible(window.innerWidth);
  }
  get whatsappUrl(): string {
    const message = `${this.translations['whatsapp_text_one']} https://www.afandinacarrental.com  ${this.translations['whatsapp_text_two']} ${this.productDetails?.data.name} \n https://www.afandinacarrental.com/${this.currentLang}/product/${this.productDetails?.data.slug}`;
    return `https://wa.me/${this.contactData.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  
  getBrandSlug(brandName: string | undefined): string {
    if (!brandName) return '';
    return brandName.toLowerCase().replace(/\s+/g, '-');
  }
  
  getCategorySlug(categoryName: string | undefined): string {
    if (!categoryName) return '';
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateNumVisible(event.target.innerWidth);
  }

  updateNumVisible(width: number) {
    if (width < 576) {
      this.numVisible = 1; // For extra small screens
    } else if (width >= 576 && width < 768) {
      this.numVisible = 2; // For small screens
    } else if (width >= 768 && width < 992) {
      this.numVisible = 3; // For medium screens
    } else if (width >= 992 && width < 1200) {
      this.numVisible = 4; // For large screens
    } else {
      this.numVisible = 5; // For extra large screens
    }
  }

  getProductBySlug() {
    if (this.ProductSlug) {
      this.productService.getProductDetails(this.ProductSlug).subscribe((res: ProductResource) => {
        this.productDetails = res;
        this.images = res.data.images.filter(item => item.type === 'image');
        if (isPlatformServer(this.platformId)) {
          this.seo.setMetaTags(this.productDetails.data.seo_data, 'product-show');
          this.seo.og_property_product(this.productDetails.data);
        }
        if (isPlatformBrowser(this.platformId)) {
          this.seo.setMetaTags(this.productDetails.data.seo_data, 'product-show');
          this.seo.og_property_product(this.productDetails.data);
        }
      },
        (error) => {
        });

    }

  }

}
