import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { AboutUsResponse } from 'src/app/Models/about.model';
import { AboutUsService } from 'src/app/services/about-us/about-us.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  aboutUsData: AboutUsResponse | null = null;
  currentLang: string = 'en';
  constructor(
    private aboutUsService: AboutUsService,
    private languageService: LanguageService,
    private router: Router,
    private seo:SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ){}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    this.aboutUsService.getAboutUsData().subscribe(
      (res) => {
        this.aboutUsData = res;
      },
      (error) => {
      }
    );
    if (isPlatformServer(this.platformId)) {
      this.seo.updateMetadataForType('about_us');
    }
    if (isPlatformBrowser(this.platformId)) {
      this.seo.updateMetadataForType('about_us');
    }
  }

}
