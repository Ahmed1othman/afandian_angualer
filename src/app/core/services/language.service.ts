import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string;
  private currentCurrency: string = '1';
  private currencyCode: string = 'AED';
  private languageChange = new BehaviorSubject<string>('');

  constructor(
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject('LANGUAGE') private ssrLang: string,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
    if (isPlatformServer(this.platformId)) {
      this.currentLanguage = this.ssrLang || 'en';
    } else if (isPlatformBrowser(this.platformId)) {
      const pathSegments = window.location.pathname.split('/').filter(segment => segment);
      if (pathSegments.length > 0 && /^[a-z]{2}$/i.test(pathSegments[0])) {
        this.currentLanguage = pathSegments[0];
        this.storageService.setItem('currentLanguage', pathSegments[0]);
      } else {
        this.currentLanguage = this.storageService.getItem('currentLanguage') || 'en';
      }
    } else {
      this.currentLanguage = 'en';
    }

    this.currentCurrency = this.storageService.getItem('currentCurrency') || '1';
    this.currencyCode = this.storageService.getItem('currencyCode') || 'AED';
    this.currencyCodeSource.next(this.currencyCode);
  }

  private languagesSource = new BehaviorSubject<any[]>([
    { code: 'ar', name: 'العربية', direction: 'rtl' },
    { code: 'en', name: 'English', direction: 'ltr' }
  ]);
  languages$ = this.languagesSource.asObservable();
  languageChange$ = this.languageChange.asObservable();

  private currenciesSource = new BehaviorSubject<any[]>([]);
  Currency$ = this.currenciesSource.asObservable();

  private currencyCodeSource = new BehaviorSubject<string>('AED');
  currentCurrencyCode$ = this.currencyCodeSource.asObservable();

  setLanguages(languages: any[]): void {
    this.languagesSource.next(languages);
  }

  setCurrencies(currencies: any[]): void {
    this.currenciesSource.next(currencies);
  }

  getCurrentLanguage(): string {
    if (isPlatformServer(this.platformId)) {
      return this.ssrLang || 'en';
    }
    return this.currentLanguage;
  }

  setCurrentLanguage(language: string): void {
    if (this.currentLanguage !== language && isPlatformBrowser(this.platformId)) {
      this.currentLanguage = language;
      this.storageService.setItem('currentLanguage', language);
      
      // Handle URL update
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/').filter(segment => segment);
      
      if (pathSegments.length > 0 && /^[a-z]{2}$/i.test(pathSegments[0])) {
        pathSegments[0] = language;
      } else {
        pathSegments.unshift(language);
      }
      
      const newPath = '/' + pathSegments.join('/');
      if (newPath !== currentPath) {
        // Navigate to new URL
        window.location.href = newPath;
      }
    }
  }

  getCurrentCurrency(): string {
    return this.currentCurrency;
  }

  setCurrentCurrency(currency: string): void {
    this.currentCurrency = currency;
    this.storageService.setItem('currentCurrency', currency);
  }

  setCurrentCurrencyCode(code: string): void {
    if (code !== this.currencyCodeSource.getValue()) {
      this.currencyCodeSource.next(code);
      this.storageService.setItem('currencyCode', code);
    }
  }

  getCurrentCurrencyCode(): string {
    return this.currencyCode;
  }
}
