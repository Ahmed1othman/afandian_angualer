"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let CategoriesComponent = exports.CategoriesComponent = class CategoriesComponent {
    constructor(route, homeService, sharedDataService, translate, languageService, seo, platformId) {
        this.route = route;
        this.homeService = homeService;
        this.sharedDataService = sharedDataService;
        this.translate = translate;
        this.languageService = languageService;
        this.seo = seo;
        this.platformId = platformId;
        this.currentLang = 'en';
        this.translations = {};
        this.categoriesSection = { categories: [] };
        this.categoryDetails = {
            category: null,
            cars: []
        };
        this.subscriptions = [];
        this.swiperConfig = {
            breakpoints: {
                320: { slidesPerView: 3.10 },
                480: { slidesPerView: 3.10 },
                640: { slidesPerView: 4.10 },
                768: { slidesPerView: 5.10 },
                1024: { slidesPerView: 6.10 },
                1280: { slidesPerView: 7.10 }
            }
        };
        this.currentLang = this.languageService.getCurrentLanguage();
    }
    ngOnInit() {
        this.loadTranslations();
        this.initializeData();
    }
    loadTranslations() {
        const translationSub = this.translate.get(['category']).subscribe(translations => {
            this.translations = translations;
        });
        this.subscriptions.push(translationSub);
    }
    initializeData() {
        const categoriesSub = this.sharedDataService.categories$.subscribe((category) => {
            if (category) {
                this.categoriesSection = category;
            }
        });
        this.subscriptions.push(categoriesSub);
        this.route.params.subscribe(params => {
            this.categorySlug = this.route.snapshot.params['slug'];
            if (this.categorySlug) {
                const detailsSub = this.homeService.getCaategoryDetails(this.categorySlug).subscribe({
                    next: (res) => {
                        this.categoryDetails = res;
                        if ((0, common_1.isPlatformServer)(this.platformId)) {
                            if (res?.category?.seo_data) {
                                this.seo.setMetaTags(res.category.seo_data, 'category');
                            }
                        }
                        else if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                            if (res?.category?.seo_data) {
                                this.seo.setMetaTags(res.category.seo_data, 'category');
                            }
                        }
                    },
                    error: (err) => {
                        console.error('Error loading category details:', err);
                        // Handle error appropriately
                    }
                });
                this.subscriptions.push(detailsSub);
            }
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
exports.CategoriesComponent = CategoriesComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-categories',
        templateUrl: './categories.component.html',
        styleUrls: ['./categories.component.scss']
    }),
    tslib_1.__param(6, (0, core_1.Inject)(core_1.PLATFORM_ID))
], CategoriesComponent);
//# sourceMappingURL=categories.component.js.map