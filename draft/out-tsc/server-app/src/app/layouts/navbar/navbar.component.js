"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
let NavbarComponent = exports.NavbarComponent = class NavbarComponent {
    constructor(router, languageService, homeService, translationService, platformId, sharedDataService) {
        this.router = router;
        this.languageService = languageService;
        this.homeService = homeService;
        this.translationService = translationService;
        this.platformId = platformId;
        this.sharedDataService = sharedDataService;
        this.currentLang = 'en'; // Default to 'en'
        this.isBrandDropdownVisible = false;
        this.isCategoryDropdownVisible = false;
        this.languages = [];
        this.searchResults = {};
        this.showDropdown = false;
        this.isDropdownVisible = false;
        this.search = false;
        this.translations = {};
        // isMobile = window.innerWidth <= 768;
        this.isMobile = false;
        this.router.events.subscribe(() => {
            this.closeNavbar();
        });
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            this.isMobile = window.innerWidth <= 768;
        }
    }
    isHomePage() {
        return this.router.url.includes('home');
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
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
    getLocationList() {
        this.homeService.getAllLocation().subscribe((res) => {
            this.locations = res.locations;
        });
    }
    toggleDropdown(type) {
        if (type === 'brand' && this.isMobile) {
            this.isBrandDropdownVisible = !this.isBrandDropdownVisible;
        }
        else if (type === 'category' && this.isMobile) {
            this.isCategoryDropdownVisible = !this.isCategoryDropdownVisible;
        }
    }
    closeNavbar() {
        if (this.navbarCollapse.nativeElement.classList.contains('show')) {
            this.navbarCollapse.nativeElement.classList.remove('show');
            this.isDropdownVisible = false;
        }
    }
    showDialog() {
        this.search = true;
    }
    close() {
        this.search = false;
    }
    Search(event) {
        const search_key = event.target.value;
        if (search_key && search_key.trim() !== '') {
            this.homeService.getSearch({ query: search_key }).subscribe((res) => {
                this.searchResults = res.data;
                this.showDropdown = true;
            }, (error) => {
                // handle error
            });
        }
        else {
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
    onClick(event) {
        const target = event.target;
        const isOutside = !target.closest('.search-results') && !target.closest('.input-group');
        if (isOutside) {
            this.showDropdown = false;
        }
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], NavbarComponent.prototype, "brands", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], NavbarComponent.prototype, "light_logo", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], NavbarComponent.prototype, "dark_logo", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], NavbarComponent.prototype, "black_logo", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)('navbarCollapse')
], NavbarComponent.prototype, "navbarCollapse", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], NavbarComponent.prototype, "languages", void 0);
tslib_1.__decorate([
    (0, core_1.HostListener)('document:click', ['$event'])
], NavbarComponent.prototype, "onClick", null);
exports.NavbarComponent = NavbarComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.scss']
    }),
    tslib_1.__param(4, (0, core_1.Inject)(core_1.PLATFORM_ID))
], NavbarComponent);
//# sourceMappingURL=navbar.component.js.map