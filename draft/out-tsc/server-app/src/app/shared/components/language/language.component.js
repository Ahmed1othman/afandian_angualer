"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let LanguageComponent = exports.LanguageComponent = class LanguageComponent {
    constructor(languageService, router) {
        this.languageService = languageService;
        this.router = router;
        this.currentLang = 'en';
        this.languages = [];
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.languageService.languages$.subscribe((languages) => {
            this.languages = languages;
        });
    }
    changeLanguage(newLang) {
        this.languageService.setCurrentLanguage(newLang);
        const currentUrl = this.router.url;
        const urlWithoutLang = currentUrl.replace(/^\/[a-zA-Z]+/, '');
        const newUrl = `/${newLang}${urlWithoutLang}`;
        // this.router.navigateByUrl(newUrl);
        window.location.href = newUrl;
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
};
exports.LanguageComponent = LanguageComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-language',
        templateUrl: './language.component.html',
        styleUrls: ['./language.component.scss']
    })
], LanguageComponent);
//# sourceMappingURL=language.component.js.map