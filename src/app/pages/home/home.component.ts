import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Carousel } from 'primeng/carousel';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { Advertisements, AfandinaSection, BlogData, BrandsSection, CategoriesSection, DocumentSection, FaqsSection, FooterSection, HeaderSection, HomeResponse, InstagramSection, LocationSection, SearchTab, SpecialOffersSection, WhyChooseUsSection } from 'src/app/Models/home.model';
import { HomeService } from 'src/app/services/home/home.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';
import SwiperCore, { Autoplay } from 'swiper';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTab!: SearchTab;
  headerSection!: HeaderSection;
  brandsSection!: BrandsSection;
  categoriesSection!: CategoriesSection;
  onlyOnAfandinaSection!: AfandinaSection;
  specialOffersSection!: SpecialOffersSection;
  whyChooseUsSection!: WhyChooseUsSection;
  blogs!: BlogData;
  faqsSection!: any;
  locationSection!: LocationSection;
  documentSection!: DocumentSection;
  instagramSection!: InstagramSection;
  footerSection!: FooterSection;
  advertisements!: Advertisements;
  where_find_us: any;
  currentLang: string = 'en';
  translations: Record<string, string> = {};
  isPlaying: { [key: string]: boolean } = {};
  swiperConfig: any = {
    breakpoints: {
      320: { slidesPerView: 3.10 },
      480: { slidesPerView: 3.10 },
      640: { slidesPerView: 4.10 },
      768: { slidesPerView: 5.10 },
      1024: { slidesPerView: 6.10 },
      1280: { slidesPerView: 7.10 }
    }
  };
  swiperBrand: any = {
    breakpoints: {
      320: { slidesPerView: 3.10 },
      480: { slidesPerView: 3.10 },
      640: { slidesPerView: 4.10 },
      768: { slidesPerView: 5.10 },
      1024: { slidesPerView: 6.10 },
      1280: { slidesPerView: 7.10 }

    }
  };
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
  swiperBlog: any = {
    breakpoints: {
      320: { slidesPerView: 1.10 },
      480: { slidesPerView: 1.10 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
    }
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private homeService: HomeService,
    private sharedDataService: SharedDataService,
    private languageService: LanguageService,
    private router: Router,
    private translationService: TranslationService,
    private seo: SeoService,
  ) { }

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.loadTranslations();
      }
    });
    this.loadTranslations();
    this.getHome();
    if (isPlatformBrowser(this.platformId)) {

      this.sharedDataService.categories$.subscribe((res) => {
        this.categoriesSection = res;
      });

      this.sharedDataService.brands$.subscribe((res) => {
        this.brandsSection = res;
      });

      this.sharedDataService.locations$.subscribe((res) => {
        this.locationSection = res;
      });
    }
    this.getFaqs();
    this.getBlogs();
    if (isPlatformServer(this.platformId)) {
      this.seo.updateMetadataForType('home');
    }
    if (isPlatformBrowser(this.platformId)) {
      this.seo.updateMetadataForType('home');
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.muted = true;
      }
    }
  }

  currentIndex: number = 0;

  getHome() {
    this.homeService.getHome().subscribe((res: HomeResponse) => {
      this.headerSection = res.data.header_section;
      this.onlyOnAfandinaSection = res.data.only_on_afandina_section;
      this.specialOffersSection = res.data.special_offers_section;
      this.whyChooseUsSection = res.data.why_choose_us_section;
      this.documentSection = res.data.document_section;
      this.instagramSection = res.data.short_videos_section;
      this.where_find_us = res.data.where_find_us;
      this.advertisements = res.data.advertisements;
    });
  }

  togglePlayPause(videoPlayer: HTMLVideoElement, videoItem: any): void {
    if (videoPlayer.paused) {
      videoPlayer.play();
      this.isPlaying[videoItem.id] = true;
    } else {
      videoPlayer.pause();
      this.isPlaying[videoItem.id] = false;
    }
  }

  getFaqs() {
    this.homeService.getFaqs().subscribe((res: FaqsSection) => {
      this.faqsSection = res;
    });
  }

  getBlogs() {
    this.homeService.getBlogs().subscribe((res: BlogData) => {
      this.blogs = res;
    });
  }

  private loadTranslations() {
    // Load existing translations
    this.translationService.getTranslations().subscribe((translations) => {
      this.translations = translations;
      // Add video player specific translations if they don't exist
      if (!this.translations['play_video']) {
        this.translations['play_video'] = this.currentLang === 'ar' ? 'تشغيل الفيديو' : 'Play video';
      }
      if (!this.translations['pause_video']) {
        this.translations['pause_video'] = this.currentLang === 'ar' ? 'إيقاف الفيديو' : 'Pause video';
      }
    });
  }
}
