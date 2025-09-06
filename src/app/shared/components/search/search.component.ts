import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  currentLang: string = 'en';
  showDropdown = false;
  searchResults: any = {};
  translations: Record<string, string> = {};


  constructor(
    private languageService: LanguageService,
    private router: Router,
    private homeService: HomeService,
    private translationService: TranslationService

  ) {}
  
  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
  }


  Search(event: any): void {
    const search_key = event.target.value;
    if (search_key && search_key.trim() !== '') {
        this.homeService.getSearch({ query: search_key }).subscribe(
            (res: any) => {
                this.searchResults = res.data;
                this.showDropdown = true;
            },
            (error) => {
            }
        );
    } else {
        this.showDropdown = false;
        this.searchResults = [];
    }
  }

  filter(){
    
  }

  onFocus() {
    this.showDropdown = !!this.searchResults.length;
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 200);
  }
}
