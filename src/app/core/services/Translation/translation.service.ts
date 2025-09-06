import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations = new BehaviorSubject<Record<string, string>>({});
  private currentLanguage = new BehaviorSubject<string>('en');

  constructor() {}

  setTranslations(data: Record<string, string>) {
    this.translations.next(data);
  }

  getTranslations() {
    return this.translations.asObservable();
  }

  getCurrentLang(): string {
    return this.currentLanguage.getValue();
  }

  setCurrentLang(lang: string) {
    this.currentLanguage.next(lang);
  }

  onLangChange() {
    return this.currentLanguage.asObservable();
  }

  translate(key: string): string {
    const currentTranslations = this.translations.getValue();
    return currentTranslations[key] || key;
  }
}
