"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogListComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let BlogListComponent = exports.BlogListComponent = class BlogListComponent {
    constructor(homeService, languageService, router) {
        this.homeService = homeService;
        this.languageService = languageService;
        this.router = router;
        this.currentLang = 'en';
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.getBlogs();
    }
    getBlogs() {
        this.homeService.getBlogs().subscribe((res) => {
            this.blogs = res;
        });
    }
};
exports.BlogListComponent = BlogListComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-blog-list',
        templateUrl: './blog-list.component.html',
        styleUrls: ['./blog-list.component.scss']
    })
], BlogListComponent);
//# sourceMappingURL=blog-list.component.js.map