import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only track page views in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects,
            page_title: typeof document !== 'undefined' ? document.title : ''
          });
        }
      });
    }
  }

  /**
   * Track custom events
   */
  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string | undefined,
    eventValue?: number | undefined
  ): void {
    if (isPlatformBrowser(this.platformId) && typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_action: eventAction,
        ...(eventLabel && { event_label: eventLabel }),
        ...(eventValue && { value: eventValue })
      });
    }
  }

  /**
   * Track conversions
   */
  public trackConversion(conversionId: string, label: string = ''): void {
    if (isPlatformBrowser(this.platformId) && typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': `AW-16836055584/${conversionId}`,
        'event_callback': () => {
          console.log('Conversion tracked successfully');
        }
      });
    }
  }
}
