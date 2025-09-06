"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardBlogComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let CardBlogComponent = exports.CardBlogComponent = class CardBlogComponent {
    constructor(translationService, languageService) {
        this.translationService = translationService;
        this.languageService = languageService;
        this.translations = {};
        this.currentLang = 'en';
    }
    generateSrcSet(imagePath) {
        const sizes = [400, 800, 1200];
        return sizes
            .map(size => `${imagePath}?width=${size} ${size}w`)
            .join(', ');
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        // Preload critical resources
        if (typeof window !== 'undefined') {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = 'https://admin.afandinacarrental.com/storage/' + this.blogData.image;
            document.head.appendChild(preloadLink);
        }
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], CardBlogComponent.prototype, "blogData", void 0);
exports.CardBlogComponent = CardBlogComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-card-blog',
        templateUrl: './card-blog.component.html',
        styleUrls: ['./card-blog.component.scss']
    })
], CardBlogComponent);
//# sourceMappingURL=card-blog.component.js.map