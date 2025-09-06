"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let SearchComponent = exports.SearchComponent = class SearchComponent {
    constructor(languageService, router, homeService, translationService) {
        this.languageService = languageService;
        this.router = router;
        this.homeService = homeService;
        this.translationService = translationService;
        this.currentLang = 'en';
        this.showDropdown = false;
        this.searchResults = {};
        this.translations = {};
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
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
};
exports.SearchComponent = SearchComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.scss']
    })
], SearchComponent);
//# sourceMappingURL=search.component.js.map