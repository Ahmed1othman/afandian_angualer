import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { blog } from 'src/app/Models/home.model';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/services/seo/seo.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blog_details: blog | undefined;
  currentLang: string = 'en';
  translations: Record<string, string> = {};
  private subscriptions: Subscription = new Subscription();

  get hasRelatedCars(): boolean {
    return !!this.blog_details?.data?.related_cars?.length;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private languageService: LanguageService,
    private router: Router,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Subscribe to router events to handle navigation within the same component
    const routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getProductBySlug();
    });
    this.subscriptions.add(routerSub);
  }

  ngOnInit(): void {
    // Get initial language
    this.currentLang = this.languageService.getCurrentLanguage();
    
    // Subscribe to language changes
    const langSub = this.languageService.languageChange$.subscribe((lang: string) => {
      this.currentLang = lang;
      this.getProductBySlug(); // Reload blog when language changes
    });
    this.subscriptions.add(langSub);

    // Subscribe to translations
    const translationsSub = this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
    this.subscriptions.add(translationsSub);

    // Initial load
    this.getProductBySlug();
  }

  getProductBySlug(): void {
    const slug = this.activatedRoute.snapshot.params['slug'];
    const blogSub = this.blogService.getBlog(slug).subscribe((res: blog) => {
      this.blog_details = res;
      // Update SEO metadata
      if (this.blog_details?.data) {
        this.updateSEO();
      }
    });
    this.subscriptions.add(blogSub);
  }

  private updateSEO(): void {
    if (this.blog_details?.data && this.blog_details.data.seo_data) {
      if (isPlatformBrowser(this.platformId) || isPlatformServer(this.platformId)) {
        this.seo.setMetaTags(this.blog_details.data.seo_data, 'blog');
        this.setCanonicalUrl();
      }
    }
  }

  private setCanonicalUrl(): void {
    if (isPlatformBrowser(this.platformId) || isPlatformServer(this.platformId)) {
      const currentUrl = this.router.url;
      const fullUrl = `${this.document.location.origin}${currentUrl}`;
      this.seo.addCanonicalTag(fullUrl);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
