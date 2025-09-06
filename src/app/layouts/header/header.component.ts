import { Component, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  categories:any;
  brands:any;
  cars:any;
  showDropdown = false;
  searchResults: any = {};
  @Input() languages: any[] = [];
  @Input() phone!: Number;
  language:any;
  currentLang: string = 'en';
  constructor(
    private languageService: LanguageService,
    private homeService: HomeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });

    this.languageService.languages$.subscribe((languages) => {
      this.languages = languages;
    });

    // this.languageService.Currency$.subscribe((Currency) => {
    //   this.currencies = Currency;
    // });
    
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
                // handle error
            }
        );
    } else {
        this.showDropdown = false;
        this.searchResults = [];
    }
}


  onFocus() {
    this.showDropdown = !!this.searchResults.length;
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 200);
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      const isOutside = !target.closest('.search-results') && !target.closest('.input-group');
      if (isOutside) {
          this.showDropdown = false;
      }
  }
}
