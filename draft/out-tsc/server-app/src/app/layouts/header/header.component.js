"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let HeaderComponent = exports.HeaderComponent = class HeaderComponent {
    constructor(languageService, homeService, router) {
        this.languageService = languageService;
        this.homeService = homeService;
        this.router = router;
        this.showDropdown = false;
        this.searchResults = {};
        this.languages = [];
        this.currentLang = 'en';
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
        // this.languageService.Currency$.subscribe((Currency) => {
        //   this.currencies = Currency;
        // });
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
], HeaderComponent.prototype, "languages", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], HeaderComponent.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, core_1.HostListener)('document:click', ['$event'])
], HeaderComponent.prototype, "onClick", null);
exports.HeaderComponent = HeaderComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
//# sourceMappingURL=header.component.js.map