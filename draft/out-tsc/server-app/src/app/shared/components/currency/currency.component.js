"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let CurrencyComponent = exports.CurrencyComponent = class CurrencyComponent {
    constructor(languageService, router, homeService, sharedDataService, platformId) {
        this.languageService = languageService;
        this.router = router;
        this.homeService = homeService;
        this.sharedDataService = sharedDataService;
        this.platformId = platformId;
        this.currentCurrency = null;
        this.currentLang = 'en';
        this.isBrowser = (0, common_1.isPlatformBrowser)(this.platformId);
        if (this.isBrowser) {
            this.currentCurrency = localStorage.getItem('currencyCode');
        }
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        if (this.isBrowser) {
            this.currentCurrency = localStorage.getItem('currencyCode');
        }
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            this.sharedDataService.crruncies$.subscribe((res) => {
                this.currencies = res.currencies;
                this.getCurrencies();
            });
        }
    }
    getCurrencies() {
        const defaultCurrency = this.currencies.find((currency) => currency.is_default === 1);
        if (defaultCurrency) {
            this.languageService.setCurrentCurrency(defaultCurrency.id.toString());
            this.languageService.setCurrentCurrencyCode(defaultCurrency.code);
            if (this.isBrowser) {
                localStorage.setItem('currentCurrencyName', defaultCurrency.name);
            }
        }
        this.languageService.setCurrencies(this.currencies);
    }
    changeCurrency(newCurrency, code, currency_name) {
        this.languageService.setCurrentCurrency(newCurrency);
        this.languageService.setCurrentCurrencyCode(code);
        if (this.isBrowser) {
            localStorage.setItem('currency_name', currency_name);
        }
        const currentUrl = this.router.url;
        // this.router.navigateByUrl(currentUrl);
        window.location.href = currentUrl;
    }
};
exports.CurrencyComponent = CurrencyComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-currency',
        templateUrl: './currency.component.html',
        styleUrls: ['./currency.component.scss']
    }),
    tslib_1.__param(4, (0, core_1.Inject)(core_1.PLATFORM_ID))
], CurrencyComponent);
//# sourceMappingURL=currency.component.js.map