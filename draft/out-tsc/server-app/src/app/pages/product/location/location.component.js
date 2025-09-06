"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const core_2 = require("@angular/core");
const common_1 = require("@angular/common");
const common_2 = require("@angular/common");
let LocationComponent = exports.LocationComponent = class LocationComponent {
    constructor(homeService, route, languageService, sharedDataService, platformId, seo) {
        this.homeService = homeService;
        this.route = route;
        this.languageService = languageService;
        this.sharedDataService = sharedDataService;
        this.platformId = platformId;
        this.seo = seo;
        this.subscriptions = new rxjs_1.Subscription();
        this.currentLang = 'en';
        this.swiperBrand = {
            breakpoints: {
                320: { slidesPerView: 3.10 },
                480: { slidesPerView: 3.10 },
                640: { slidesPerView: 4.10 },
                768: { slidesPerView: 5.10 },
                1024: { slidesPerView: 6.10 },
                1280: { slidesPerView: 7.10 }
            }
        };
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
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        const brandsSubscription = this.sharedDataService.brands$.subscribe((brands) => {
            if (brands) {
                this.brandsSection = brands;
            }
        });
        const categoriesSections = this.sharedDataService.categories$.subscribe((category) => {
            if (category) {
                this.categoriesSection = category;
            }
        });
        this.subscriptions.add(brandsSubscription);
        this.subscriptions.add(categoriesSections);
        this.route.params.subscribe(params => {
            this.brandSlug = this.route.snapshot.params['slug'];
            this.getBrandBySlug();
        });
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    getBrandBySlug() {
        if (this.brandSlug) {
            this.homeService.getlocationDetails(this.brandSlug).subscribe((res) => {
                this.locationDetails = res;
                if ((0, common_1.isPlatformServer)(this.platformId)) {
                    this.seo.setMetaTags(this.locationDetails.location.seo_data, 'location');
                }
                if ((0, common_2.isPlatformBrowser)(this.platformId)) {
                    this.seo.setMetaTags(this.locationDetails.location.seo_data, 'location');
                }
            }, (error) => {
            });
        }
    }
};
exports.LocationComponent = LocationComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-location',
        templateUrl: './location.component.html',
        styleUrls: ['./location.component.scss']
    }),
    tslib_1.__param(4, (0, core_2.Inject)(core_2.PLATFORM_ID))
], LocationComponent);
//# sourceMappingURL=location.component.js.map