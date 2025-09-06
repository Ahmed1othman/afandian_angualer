import { Component, Inject, PLATFORM_ID, Optional, HostListener } from '@angular/core';
import { BrandsSection, CategoriesSection } from './Models/home.model';

import { HomeService } from './services/home/home.service';

import { SharedDataService } from './services/SharedDataService/shared-data-service.service';

import { MainSetting } from './Models/setting.models';

import { LanguageService } from './core/services/language.service';

import { LoaderService } from './core/services/loader/loader.service';

import { TranslationService } from './core/services/Translation/translation.service';

import { ActivatedRoute, Router } from '@angular/router';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']

})

export class AppComponent {

  title = 'Afandina';

  brandsSection!: BrandsSection;

  categoriesSection!: CategoriesSection;

  settings!: MainSetting;

  languages: any[] = [];

  currencies: any[] = [];

  currentLang: string = 'en';

  dark_logo!: string;

  light_logo !: string;

  black_logo !: string;

  isScrolled = false;

  favicon!: string;

  // Phone number as a number type to match the component binding
  phoneNumber!: number;

  contactData: any;

  isLoading$ = this.loaderService.loading$;



  constructor(

    @Inject(PLATFORM_ID) private platformId: Object,

    @Optional() @Inject('LANGUAGE') private ssrLang: string,

    private homeService: HomeService,

    private sharedDataService: SharedDataService,

    private languageService: LanguageService,

    private loaderService: LoaderService,

    private translationService: TranslationService,

    private route: ActivatedRoute,

    private router: Router,

  ) { }



  ngOnInit() {

    // Get current language - this will handle both SSR and browser cases

    const currentLang = this.languageService.getCurrentLanguage();

    

    // Apply language settings

    this.applyLanguageSettings(currentLang);

    

    if (isPlatformBrowser(this.platformId)) {

      this.getSettings();



      this.sharedDataService.categories$.subscribe((res) => {

        this.sharedDataService.updateCategories(res);

      });

  

      this.sharedDataService.brands$.subscribe((res) => {

        this.sharedDataService.updateBrands(res);

      });

    }

  }



  applyLanguageSettings(newLang: any) {

    const bo = document.querySelector('body');

    const el = document.querySelector('html');



    if (el && bo) {

      if (newLang === 'ar') {

        el.setAttribute('lang', 'ar');

        el.setAttribute('direction', 'rtl');

        el.setAttribute('dir', 'rtl');

        el.style.direction = 'rtl';

        bo.classList.add('arabic');

        el.classList.add('arabic');

      } else {

        el.setAttribute('lang', 'en');

        el.setAttribute('direction', 'ltr');

        el.setAttribute('dir', 'ltr');

        el.style.direction = 'ltr';

        bo.classList.remove('arabic');

        el.classList.remove('arabic');

      }

    }

  }



  getSettings() {
    this.homeService.getSettings().subscribe((res: any) => {
      this.settings = res;
      this.dark_logo = res.data.main_setting.dark_logo;
      this.light_logo = res.data.main_setting.light_logo;
      this.black_logo = res.data.main_setting.black_logo;
      this.favicon = res.data.main_setting.favicon;
      this.phoneNumber = res.data.main_setting.contact_data.phone;

      this.languages = res.data.main_setting.languages;
      this.contactData = res.data.main_setting.contact_data;

      this.languageService.setLanguages(this.languages);
      this.sharedDataService.contactData(this.contactData);

      const translationData = res.data.main_setting.translation_data;
      this.translationService.setTranslations(translationData);
      this.updateIconHref();

      const defaultCurrency = this.currencies.find((currency: any) => currency.is_default === 1);

      if (defaultCurrency) {
        localStorage.setItem('currentCurrency', defaultCurrency.id.toString());
        localStorage.setItem('currencyCode', defaultCurrency.code);
        localStorage.setItem('currency_name', defaultCurrency.name);

        this.languageService.setCurrentCurrency(defaultCurrency.id.toString());
        this.languageService.setCurrentCurrencyCode(defaultCurrency.code);
      }
    });
  }



  updateIconHref() {

    const iconUrl = `${this.favicon}`;

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');

    link.setAttribute('rel', 'icon');

    link.setAttribute('type', 'image/x-icon');

    link.setAttribute('href', iconUrl);



    if (!document.head.contains(link)) {

      document.head.appendChild(link);

    }

  }

  // مراقبة حدث التمرير
  @HostListener('window:scroll')
  onWindowScroll() {
    // ظهور الزر عندما يتجاوز التمرير 300 بكسل
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 300;
  }

  // وظيفة التمرير لأعلى الصفحة
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
