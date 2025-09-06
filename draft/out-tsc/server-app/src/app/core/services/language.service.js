"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LanguageService = exports.LanguageService = class LanguageService {
    constructor(storageService) {
        this.storageService = storageService;
        this.currentLanguage = 'en'; // Default to 'en'
        this.currentCurrency = '1'; // Default to '1'
        this.currencyCode = 'AED'; // Default to 'AED'
        this.languagesSource = new rxjs_1.BehaviorSubject([]);
        this.languages$ = this.languagesSource.asObservable();
        this.currenciesSource = new rxjs_1.BehaviorSubject([]);
        this.Currency$ = this.currenciesSource.asObservable(); // <-- Correct export
        this.currencyCodeSource = new rxjs_1.BehaviorSubject('AED');
        this.currentCurrencyCode$ = this.currencyCodeSource.asObservable();
        this.currentLanguage = this.storageService.getItem('currentLanguage') || 'en';
        this.currentCurrency = this.storageService.getItem('currentCurrency') || '1';
        this.currencyCode = this.storageService.getItem('currencyCode') || 'AED';
        this.currencyCodeSource.next(this.currencyCode);
    }
    setLanguages(languages) {
        this.languagesSource.next(languages);
    }
    setCurrencies(currencies) {
        this.currenciesSource.next(currencies);
    }
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    setCurrentLanguage(language) {
        this.currentLanguage = language;
        this.storageService.setItem('currentLanguage', language);
    }
    getCurrentCurrency() {
        return this.currentCurrency;
    }
    setCurrentCurrency(currency) {
        this.currentCurrency = currency;
        this.storageService.setItem('currentCurrency', currency);
    }
    setCurrentCurrencyCode(code) {
        if (code !== this.currencyCodeSource.getValue()) {
            this.currencyCodeSource.next(code);
            this.currencyCode = code;
            this.storageService.setItem('currencyCode', code);
        }
    }
    getCurrentCurrencyCode() {
        return this.currencyCode;
    }
};
exports.LanguageService = LanguageService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], LanguageService);
//# sourceMappingURL=language.service.js.map