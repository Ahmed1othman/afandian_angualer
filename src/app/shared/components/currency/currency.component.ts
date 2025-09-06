import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { HomeService } from 'src/app/services/home/home.service';
import { isPlatformBrowser } from '@angular/common';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  currencies: any;
  currentCurrency: string | null = null;
  isBrowser: boolean;
  currentLang: string = 'en';

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private homeService: HomeService,
    private sharedDataService: SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.currentCurrency = localStorage.getItem('currencyCode');
    }
  }

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();

    if (this.isBrowser) {
      this.currentCurrency = localStorage.getItem('currencyCode');
    }
    if (isPlatformBrowser(this.platformId)) {
      this.sharedDataService.crruncies$.subscribe((res) => {
        if (res && res.currencies) {
          this.currencies = res.currencies;
          this.getCurrencies();
        }
      });
    }
  }

  getCurrencies() {
    const defaultCurrency = this.currencies.find((currency: any) => currency.is_default === 1);
    if (defaultCurrency) {
      this.languageService.setCurrentCurrency(defaultCurrency.id.toString());
      this.languageService.setCurrentCurrencyCode(defaultCurrency.code);
      if (this.isBrowser) {
        localStorage.setItem('currentCurrencyName', defaultCurrency.name);
      }
    }
    this.languageService.setCurrencies(this.currencies);
  }

  changeCurrency(newCurrency: string, code: string, currency_name: string) {
    this.languageService.setCurrentCurrency(newCurrency);
    this.languageService.setCurrentCurrencyCode(code);
    if (this.isBrowser) {
      localStorage.setItem('currency_name', currency_name);
    }
    const currentUrl = this.router.url;
    // this.router.navigateByUrl(currentUrl);
    window.location.href = currentUrl;
  }
}
