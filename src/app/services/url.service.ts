import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor() {}

  createCarUrl(lang: string, slug: string): string {
    return `/${lang}/${slug}-rental-in-dubai`;
  }

  createCategoryUrl(lang: string, slug: string): string {
    return `/${lang}/${slug}-cars-rental-dubai`;
  }

  createBrandUrl(lang: string, slug: string): string {
    return `/${lang}/${slug}-cars-rental-dubai`;
  }

  // دالة مساعدة لاستخراج slug من URL
  extractSlug(url: string): string {
    if (url.includes('-rental-in-dubai')) {
      return url.replace('-rental-in-dubai', '');
    }
    if (url.includes('-cars-rental-dubai')) {
      return url.replace('-cars-rental-dubai', '');
    }
    return url;
  }
} 