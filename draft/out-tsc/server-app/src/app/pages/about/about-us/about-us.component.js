"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUsComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const core_2 = require("@angular/core");
const common_1 = require("@angular/common");
const common_2 = require("@angular/common");
let AboutUsComponent = exports.AboutUsComponent = class AboutUsComponent {
    constructor(aboutUsService, languageService, router, seo, platformId) {
        this.aboutUsService = aboutUsService;
        this.languageService = languageService;
        this.router = router;
        this.seo = seo;
        this.platformId = platformId;
        this.aboutUsData = null;
        this.currentLang = 'en';
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.aboutUsService.getAboutUsData().subscribe((res) => {
            this.aboutUsData = res;
        }, (error) => {
        });
        if ((0, common_1.isPlatformServer)(this.platformId)) {
            this.seo.updateMetadataForType('about_us');
        }
        if ((0, common_2.isPlatformBrowser)(this.platformId)) {
            this.seo.updateMetadataForType('about_us');
        }
    }
};
exports.AboutUsComponent = AboutUsComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-about-us',
        templateUrl: './about-us.component.html',
        styleUrls: ['./about-us.component.scss']
    }),
    tslib_1.__param(4, (0, core_2.Inject)(core_2.PLATFORM_ID))
], AboutUsComponent);
//# sourceMappingURL=about-us.component.js.map