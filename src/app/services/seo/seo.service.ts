import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../home/home.service';
import { isPlatformServer } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  currentLang: string = '';
  ar: any;
  currentUrl: any;
  private renderer: Renderer2;

  constructor(
    private homeService: HomeService,
    private meta: Meta,
    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private platformLocation: PlatformLocation,
    private languageService: LanguageService,

  ) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.setCurrentUrl();
  }


  private setCurrentUrl(): void {
    if (isPlatformBrowser(this.platformId)) {
      // For browser
      this.currentUrl = this.platformLocation.href || this.getUrlFromLocation();
    } else if (isPlatformServer(this.platformId)) {
      // For server
      this.currentUrl = this.getUrlFromLocation();
    }
  }

  private getUrlFromLocation(): string {
    const location = this.platformLocation as any;
    return `${location.protocol}//${location.hostname}${location.pathname}${location.search}`;
  }

  updateMetadataForType(type: string): void {
    this.homeService.getSeo().subscribe({
      next: (response: any) => {
        const matchedData = response[type]?.seo_data;

        if (matchedData) {
          this.setMetaTags(matchedData, type);
        }
      },
      error: (error) => {
        console.error('Error fetching SEO data', error);
      },
    });
  }

  setMetaTags(matchedData: any, type: string): void {
    if (matchedData) {
      this.titleService.setTitle(matchedData.seo_title);

      this.meta.removeTag("name='description'");
      this.meta.removeTag("name='keywords'");

      this.meta.updateTag({ name: 'description', content: matchedData.seo_description });
      this.meta.updateTag({ name: 'keywords', content: matchedData.seo_keywords });


      this.meta.removeTag("rel='canonical'");
      this.meta.removeTag("rel='alternate'");
      this.meta.removeTag("name='robots'");

      // const hreflang = this.currentLang;


      this.addCanonicalTag(this.currentUrl); // Ensure this only runs in the browser
      this.addMetaRobotsTag(matchedData.seo_robots);
      
      // Add hreflang tags for all supported languages
      this.addHreflangTags();


      if (type === 'home' || type === 'blog'|| type === 'brands' || type === 'category') {
        this.og_property(matchedData);
      }else{
        this.clearMetaTags();
      }

      if (matchedData.schemas) {
        this.addSchemas(matchedData.schemas);
      }      
    }
  }

  og_property(matchedData:any){
    this.meta.updateTag({ property: 'og:title', content: matchedData.seo_title });
    this.meta.updateTag({ property: 'og:description', content: matchedData.seo_description });
    this.meta.updateTag({ property: 'og:image', content: matchedData.seo_image });
    this.meta.updateTag({ property: 'og:image:alt', content: matchedData.seo_image_alt });
    this.meta.updateTag({ property: 'og:url', content: this.currentUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'متجر أفندينا' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  og_property_product(matchedData:any){
    this.meta.updateTag({ property: 'og:title', content: matchedData.name });
    this.meta.updateTag({ property: 'og:description', content: matchedData.description });
    this.meta.updateTag({ property: 'og:image', content: matchedData.images[0].file_path });
    this.meta.updateTag({ property: 'og:image', content: `https://admin.afandinacarrental.com/storage/${matchedData.images[0].file_path}`});
    this.meta.updateTag({ property: 'og:image:alt', content: matchedData.images[0].alt });
    this.meta.updateTag({ property: 'og:url', content: this.currentUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'متجر أفندينا' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  addSchemas(schemas: { [key: string]: any }): void {
    const existingScripts = Array.from(this.document.querySelectorAll('script[type="application/ld+json"]'));
    existingScripts.forEach(script => script.remove());

    for (const schemaKey in schemas) {
      if (schemas[schemaKey]) {
        const scriptContent = JSON.stringify(schemas[schemaKey]);
        if (isPlatformBrowser(this.platformId)) {
          const script: HTMLScriptElement = this.renderer.createElement('script');
          script.type = 'application/ld+json';
          script.text = scriptContent;
          this.renderer.appendChild(this.document.head, script);
        } else if (isPlatformServer(this.platformId)) {
          const scriptTag = `<script type="application/ld+json">${scriptContent}</script>`;
          this.document.head.insertAdjacentHTML('beforeend', scriptTag);
        }
      }
    }
  }

  addCanonicalTag(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const existingLink = this.document.querySelector('link[rel="canonical"]');
      if (existingLink) {
        this.renderer.setAttribute(existingLink, 'href', url);
      } else {
        const link: HTMLLinkElement = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'canonical');
        this.renderer.setAttribute(link, 'href', url);
        this.renderer.appendChild(this.document.head, link);
      }
    } else if (isPlatformServer(this.platformId)) {
      const canonicalTag = `<link rel="canonical" href="${url}">`;
      this.document.head.insertAdjacentHTML('beforeend', canonicalTag);
    }
  }

  addAlternateTag(url: string, hreflang: string): void {
    const alternateHTML = `<link rel="alternate" hreflang="${hreflang}" href="${url}">`;

    if (isPlatformBrowser(this.platformId)) {
      // Check if the alternate tag already exists
      const alternateLink = this.document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (alternateLink) {
        // Update existing alternate tag
        this.renderer.setAttribute(alternateLink, 'href', url);
      } else {
        // Create a new alternate tag
        const link: HTMLLinkElement = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'alternate');
        this.renderer.setAttribute(link, 'hreflang', hreflang);
        this.renderer.setAttribute(link, 'href', url);
        this.renderer.appendChild(this.document.head, link);
      }
    } else if (isPlatformServer(this.platformId)) {
      // For SSR, inject the alternate tag into the document head
      this.document.head.insertAdjacentHTML('beforeend', alternateHTML);
    }
  }


  addMetaRobotsTag(robotsData: { index: string; follow: string }): void {
    const content = `${robotsData.index}, ${robotsData.follow}`;
    const robotsMetaHTML = `<meta name="robots" content="${content}">`;

    if (isPlatformBrowser(this.platformId)) {
      const robotsMeta = this.document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        this.renderer.setAttribute(robotsMeta, 'content', content);
      } else {
        const meta: HTMLMetaElement = this.renderer.createElement('meta');
        this.renderer.setAttribute(meta, 'name', 'robots');
        this.renderer.setAttribute(meta, 'content', content);
        this.renderer.appendChild(this.document.head, meta);
      }
    } else if (isPlatformServer(this.platformId)) {
      this.document.head.insertAdjacentHTML('beforeend', robotsMetaHTML);
    }
  }
  
  clearMetaTags(): void {
    const tags = [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
    ];

    tags.forEach((tag) => {
      this.meta.removeTag(`property="${tag}"`);
    });
  }

  /**
   * Add hreflang tags for all supported languages and a default tag
   * This helps search engines understand which language version to show to users
   */
  addHreflangTags(): void {
    if (!isPlatformBrowser(this.platformId) && !isPlatformServer(this.platformId)) {
      return;
    }

    // Clear existing hreflang tags
    const existingHreflangTags = Array.from(this.document.querySelectorAll('link[rel="alternate"][hreflang]'));
    existingHreflangTags.forEach(tag => tag.remove());

    // Get current URL path without language prefix
    const currentPath = this.getCurrentPathWithoutLanguage();
    
    // Get base URL (domain)
    const baseUrl = this.getBaseUrl();

    // Get all supported languages from the language service
    this.languageService.languages$.subscribe(languages => {
      if (languages && languages.length > 0) {
        // Add hreflang tags for each language
        languages.forEach(lang => {
          const url = `${baseUrl}/${lang.code}${currentPath}`;
          this.addAlternateTag(url, lang.code);
        });

        // Find default language (usually English or the first language in the list)
        const defaultLang = languages.find(l => l.code === 'en') || languages[0];
        
        // Add x-default hreflang tag (default language version)
        const defaultUrl = `${baseUrl}/${defaultLang.code}${currentPath}`;
        this.addAlternateTag(defaultUrl, 'x-default');
      }
    });
  }

  /**
   * Get the current path without the language prefix
   */
  private getCurrentPathWithoutLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const pathSegments = window.location.pathname.split('/');
      // Remove empty first segment and language code
      if (pathSegments.length > 1 && /^[a-z]{2}$/i.test(pathSegments[1])) {
        return '/' + pathSegments.slice(2).join('/');
      }
      return window.location.pathname;
    } else if (isPlatformServer(this.platformId)) {
      // For server-side rendering
      const location = this.platformLocation as any;
      const pathSegments = location.pathname.split('/');
      if (pathSegments.length > 1 && /^[a-z]{2}$/i.test(pathSegments[1])) {
        return '/' + pathSegments.slice(2).join('/');
      }
      return location.pathname;
    }
    return '';
  }

  /**
   * Get the base URL (domain) of the website
   */
  private getBaseUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return `${window.location.protocol}//${window.location.host}`;
    } else if (isPlatformServer(this.platformId)) {
      const location = this.platformLocation as any;
      return `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`;
    }
    return '';
  }
}
