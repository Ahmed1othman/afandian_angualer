"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCurrencyInterceptor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let LanguageCurrencyInterceptor = exports.LanguageCurrencyInterceptor = class LanguageCurrencyInterceptor {
    constructor(languageService) {
        this.languageService = languageService;
    }
    intercept(req, next) {
        const language = this.languageService.getCurrentLanguage();
        const currency = this.languageService.getCurrentCurrency();
        // Clone the request to add the new headers
        const modifiedReq = req.clone({
            setHeaders: {
                'Accept-Language': language,
                'Currency': currency,
                'Access-Control-Allow-Origin': '*'
            }
        });
        // Pass the modified request to the next handler
        return next.handle(modifiedReq);
    }
};
exports.LanguageCurrencyInterceptor = LanguageCurrencyInterceptor = tslib_1.__decorate([
    (0, core_1.Injectable)()
], LanguageCurrencyInterceptor);
//# sourceMappingURL=language-currency.interceptor.js.map