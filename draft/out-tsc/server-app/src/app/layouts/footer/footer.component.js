"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let FooterComponent = exports.FooterComponent = class FooterComponent {
    constructor(sharedDataService, footerService, languageService, router, translationService) {
        this.sharedDataService = sharedDataService;
        this.footerService = footerService;
        this.languageService = languageService;
        this.router = router;
        this.translationService = translationService;
        this.translations = {};
        this.brandsSection = null;
        this.footerData = null;
        this.currentLang = 'en'; // Default to 'en'
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.sharedDataService.brands$.subscribe((brands) => {
            this.brandsSection = brands;
        });
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        this.footer();
    }
    footer() {
        this.footerService.getFooterData().subscribe((res) => {
            this.footerData = res;
        });
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], FooterComponent.prototype, "light_logo", void 0);
exports.FooterComponent = FooterComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss']
    })
], FooterComponent);
//# sourceMappingURL=footer.component.js.map