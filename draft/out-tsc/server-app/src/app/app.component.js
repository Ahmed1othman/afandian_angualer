"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let AppComponent = exports.AppComponent = class AppComponent {
    constructor(platformId, homeService, sharedDataService, languageService, loaderService, translationService) {
        this.platformId = platformId;
        this.homeService = homeService;
        this.sharedDataService = sharedDataService;
        this.languageService = languageService;
        this.loaderService = loaderService;
        this.translationService = translationService;
        this.title = 'Afandina';
        this.languages = [];
        this.currencies = [];
        this.currentLang = 'en';
        this.isLoading$ = this.loaderService.loading$;
    }
    ngOnInit() {
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            const lang = this.languageService.getCurrentLanguage();
            this.applyLanguageSettings(lang);
            this.getSettings();
        }
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            // Directly subscribe to the observables
            this.sharedDataService.categories$.subscribe((res) => {
                this.sharedDataService.updateCategories(res);
            });
            this.sharedDataService.brands$.subscribe((res) => {
                this.sharedDataService.updateBrands(res);
            });
        }
    }
    applyLanguageSettings(newLang) {
        const bo = document.querySelector('body');
        const el = document.querySelector('html');
        if (el && bo) {
            if (newLang === 'ar') {
                el.setAttribute('lang', 'ar');
                el.setAttribute('direction', 'rtl');
                el.setAttribute('dir', 'rtl');
                el.style.direction = 'rtl';
                bo.classList.add('arabic');
                el.classList.add('arabic');
            }
            else {
                el.setAttribute('lang', 'en');
                el.setAttribute('direction', 'ltr');
                el.setAttribute('dir', 'ltr');
                el.style.direction = 'ltr';
                bo.classList.remove('arabic');
                el.classList.remove('arabic');
            }
        }
    }
    getSettings() {
        this.homeService.getSettings().subscribe((res) => {
            this.settings = res;
            this.dark_logo = res.data.main_setting.dark_logo;
            this.light_logo = res.data.main_setting.light_logo;
            this.favicon = res.data.main_setting.favicon;
            this.black_logo = res.data.main_setting.black_logo;
            this.phoneNumber = res.data.main_setting.contact_data.phone;
            this.languages = res.data.main_setting.languages;
            this.contactData = res.data.main_setting.contact_data;
            this.languageService.setLanguages(this.languages);
            this.sharedDataService.contactData(this.contactData);
            const translationData = res.data.main_setting.translation_data;
            this.translationService.setTranslations(translationData);
            this.updateIconHref();
            const defaultCurrency = this.currencies.find((currency) => currency.is_default === 1);
            if (defaultCurrency) {
                localStorage.setItem('currentCurrency', defaultCurrency.id.toString());
                localStorage.setItem('currencyCode', defaultCurrency.code);
                localStorage.setItem('currency_name', defaultCurrency.name);
                this.languageService.setCurrentCurrency(defaultCurrency.id.toString());
                this.languageService.setCurrentCurrencyCode(defaultCurrency.code);
            }
        });
    }
    updateIconHref() {
        const iconUrl = `${this.favicon}`;
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.setAttribute('rel', 'icon');
        link.setAttribute('type', 'image/x-icon');
        link.setAttribute('href', iconUrl);
        if (!document.head.contains(link)) {
            document.head.appendChild(link);
        }
    }
};
exports.AppComponent = AppComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    tslib_1.__param(0, (0, core_1.Inject)(core_1.PLATFORM_ID))
], AppComponent);
//# sourceMappingURL=app.component.js.map