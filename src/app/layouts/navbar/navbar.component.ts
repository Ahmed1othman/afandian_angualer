import { Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { HomeService } from 'src/app/services/home/home.service';
import { SharedDataService } from 'src/app/services/SharedDataService/shared-data-service.service';
import { isPlatformBrowser } from '@angular/common';
import { BrandsSection, CategoriesSection, LocationSection } from 'src/app/Models/home.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() brands:any;
  brandsSection!: BrandsSection;
  categoriesSection!: CategoriesSection;
  locationSection!: LocationSection;

  @Input() light_logo!: string;
  @Input() dark_logo!: string;
  @Input() black_logo!: string;

  
  currentLang: string = 'en'; // Default to 'en'
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  isBrandDropdownVisible = false;
  isCategoryDropdownVisible = false;
  isLocationDropdownVisible = false;
  @Input() languages: any[] = [];
  searchResults: any = {};
  showDropdown = false;
  isDropdownVisible = false;
  search: boolean = false;
  translations: Record<string, string> = {};
  // isMobile = window.innerWidth <= 768;
  isMobile = false;

  locations:any;
  constructor(
    private router: Router,
    private languageService: LanguageService,
    private homeService: HomeService,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public sharedDataService: SharedDataService,

  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(() => {
        this.closeNavbar();
      });
      this.isMobile = window.innerWidth <= 768;
    }
  }

  isHomePage(): boolean {
    return this.router.url.includes('home');
  }

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    if (isPlatformBrowser(this.platformId)) {

      this.translationService.getTranslations().subscribe((data) => {
        this.translations = data;
      });


        this.sharedDataService.categories$.subscribe((res) => {
          this.categoriesSection = res;
        });
    
        this.sharedDataService.brands$.subscribe((res) => {
          this.brandsSection = res;
        });
    
        this.sharedDataService.locations$.subscribe((res) => {
          this.locationSection = res;
        });
    }
    
  }

  getLocationList(){
    this.homeService.getAllLocation().subscribe((res: any) => {
      this.locations = res.locations;
    });
  }

  // toggleDropdown(type: 'brand' | 'category' | 'location') {
  //   if (type === 'brand') {
  //     this.isBrandDropdownVisible = !this.isBrandDropdownVisible;
  //     this.isCategoryDropdownVisible = false;
  //     this.isLocationDropdownVisible = false;
  //   } else if (type === 'category') {
  //     this.isCategoryDropdownVisible = !this.isCategoryDropdownVisible;
  //     this.isBrandDropdownVisible = false;
  //     this.isLocationDropdownVisible = false;
  //   } else if (type === 'location') {
  //     this.isLocationDropdownVisible = !this.isLocationDropdownVisible;
  //     this.isBrandDropdownVisible = false;
  //     this.isCategoryDropdownVisible = false;
  //   }
  // }

  toggleDropdown(type: 'brand' | 'category' | 'location') {
    if (type === 'brand') {
      this.isBrandDropdownVisible = !this.isBrandDropdownVisible;
      this.isCategoryDropdownVisible = false;
      this.isLocationDropdownVisible = false;
    } else if (type === 'category') {
      this.isCategoryDropdownVisible = !this.isCategoryDropdownVisible;
      this.isBrandDropdownVisible = false;
      this.isLocationDropdownVisible = false;
    } else if (type === 'location') {
      this.isLocationDropdownVisible = !this.isLocationDropdownVisible;
      this.isBrandDropdownVisible = false;
      this.isCategoryDropdownVisible = false;
    }
  }

  closeNavbar() {
    if (isPlatformBrowser(this.platformId) && this.navbarCollapse?.nativeElement) {
      if (this.navbarCollapse.nativeElement.classList.contains('show')) {
        this.navbarCollapse.nativeElement.classList.remove('show');
        this.isDropdownVisible = false;
      }
    }
  }

  // closeNavbar() {
  //   if (isPlatformBrowser(this.platformId) && this.navbarCollapse?.nativeElement) {
  //     if (this.navbarCollapse.nativeElement.classList.contains('show')) {
  //       this.navbarCollapse.nativeElement.classList.remove('show');
  //       this.isDropdownVisible = false;
  //     }
  //   }
  // }

  showDialog() {
    this.search = true;
  }
  
  close() {
    this.search = false;
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

}
