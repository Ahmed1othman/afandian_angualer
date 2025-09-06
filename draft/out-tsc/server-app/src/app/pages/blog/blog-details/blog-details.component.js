"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDetailsComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const core_2 = require("@angular/core");
const common_1 = require("@angular/common");
const common_2 = require("@angular/common");
const common_3 = require("@angular/common");
let BlogDetailsComponent = exports.BlogDetailsComponent = class BlogDetailsComponent {
    constructor(router, blog, languageService, route, translationService, platformId, seo, document) {
        this.router = router;
        this.blog = blog;
        this.languageService = languageService;
        this.route = route;
        this.translationService = translationService;
        this.platformId = platformId;
        this.seo = seo;
        this.document = document;
        this.currentLang = 'en';
        this.translations = {};
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.route.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        this.getProductBySlug();
    }
    getProductBySlug() {
        const slug = this.router.snapshot.params['slug'];
        this.blog.getBlog(slug).subscribe((res) => {
            this.blog_details = res;
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                this.seo.setMetaTags(this.blog_details.data.seo_data, 'blog');
                this.setCanonicalUrl();
            }
            if ((0, common_2.isPlatformServer)(this.platformId)) {
                this.seo.setMetaTags(this.blog_details.data.seo_data, 'blog');
                this.setCanonicalUrl();
            }
        }, (error) => {
        });
    }
    setCanonicalUrl() {
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            const currentUrl = this.route.url; // Get the current URL
            const fullUrl = `${this.document.location.origin}${currentUrl}`;
            this.seo.addCanonicalTag(fullUrl);
        }
        if ((0, common_2.isPlatformServer)(this.platformId)) {
            const currentUrl = this.route.url; // Get the current URL
            const fullUrl = `${this.document.location.origin}${currentUrl}`;
            this.seo.addCanonicalTag(fullUrl);
        }
    }
};
exports.BlogDetailsComponent = BlogDetailsComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-blog-details',
        templateUrl: './blog-details.component.html',
        styleUrls: ['./blog-details.component.scss']
    }),
    tslib_1.__param(5, (0, core_2.Inject)(core_2.PLATFORM_ID)),
    tslib_1.__param(7, (0, core_2.Inject)(common_3.DOCUMENT))
], BlogDetailsComponent);
//# sourceMappingURL=blog-details.component.js.map