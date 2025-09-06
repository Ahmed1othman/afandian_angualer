import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { FooterData } from 'src/app/Models/footer.model';
import { BrandsSection, CategoriesSection, LocationSection } from 'src/app/Models/home.model';
import { FooterService } from 'src/app/services/footer/footer.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  translations: Record<string, string> = {};

  brandsSection: BrandsSection | null = null;
  categoriesSection: CategoriesSection | null = null;
  locationsSection: LocationSection | null = null;
  footerData:FooterData | null = null;
  currentLang: string = 'en'; // Default to 'en'
  @Input() light_logo!:string;
  constructor(
    private sharedDataService: SharedDataService,
    private footerService:FooterService,
    private languageService: LanguageService,
    private router: Router,
    private translationService: TranslationService

  ) {}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();
     this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    this.sharedDataService.brands$.subscribe((brands) => {
      this.brandsSection = brands;
    });
    this.sharedDataService.categories$.subscribe((categories) => {
      this.categoriesSection = categories;
    });
    if ((this.sharedDataService as any).locations$) {
      (this.sharedDataService as any).locations$.subscribe((locations: LocationSection) => {
        this.locationsSection = locations;
      });
    }
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
    this.footer();
  }

  footer(){
    this.footerService.getFooterData().subscribe((res: FooterData) => {
      this.footerData = res;
    });
  }

}
