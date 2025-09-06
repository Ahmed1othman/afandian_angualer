import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper';

// تفعيل الموديولز المطلوبة
SwiperCore.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() carData: any;
  currentLang: string = 'en';
  contactData:any;
  translations: Record<string, string> = {};
  currency_name = localStorage.getItem('currency_name');
  constructor(
    private languageService: LanguageService,
    private sharedDataService: SharedDataService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,

  ){
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem('someKey');
    }
  }

  get whatsappUrl(): string {
    const message = `${this.translations['whatsapp_text_one']} https://www.afandinacarrental.com  ${this.translations['whatsapp_text_two']} ${this.carData.name} \n https://www.afandinacarrental.com/${this.currentLang}/product/${this.carData.slug}`;
    return `https://wa.me/${this.contactData.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    this.sharedDataService.currentWhatsapp.subscribe(data => {
      this.contactData = data;
    });
    this.loadTranslations();
  }

  private loadTranslations() {
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
  }
}
