"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductShowComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const core_2 = require("@angular/core");
const common_1 = require("@angular/common");
const common_2 = require("@angular/common");
let ProductShowComponent = exports.ProductShowComponent = class ProductShowComponent {
    constructor(productService, route, languageService, router, translationService, platformId, seo, sharedDataService) {
        this.productService = productService;
        this.route = route;
        this.languageService = languageService;
        this.router = router;
        this.translationService = translationService;
        this.platformId = platformId;
        this.seo = seo;
        this.sharedDataService = sharedDataService;
        this.productDetails = null;
        this.currentLang = 'en';
        this.numVisible = 5;
        this.translations = {};
        this.activeIndex = 0;
        this.swiperCard = {
            breakpoints: {
                320: { slidesPerView: 1.10 },
                480: { slidesPerView: 2.10 },
                900: { slidesPerView: 3 },
                1100: { slidesPerView: 3.10 },
                1200: { slidesPerView: 3.10 },
                1400: { slidesPerView: 4 },
                1500: { slidesPerView: 4.10 },
                1800: { slidesPerView: 4.10 }
            }
        };
        this.responsiveOptions = [
            {
                breakpoint: '320',
                numVisible: 3,
                slidesPerView: 1, // One image per view
            },
            {
                breakpoint: '480',
                numVisible: 3,
                slidesPerView: 1, // One image per view
            },
            {
                breakpoint: '900',
                numVisible: 3,
                slidesPerView: 1 // Three images per view
            },
            {
                breakpoint: '1100',
                numVisible: 4,
                slidesPerView: 1 // Four images per view
            }
        ];
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.route.params.subscribe(params => {
            this.ProductSlug = this.route.snapshot.params['slug'];
            this.getProductBySlug();
        });
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        this.sharedDataService.currentWhatsapp.subscribe(data => {
            this.contactData = data || {}; // Get whatsapp from the service
        });
        this.updateNumVisible(window.innerWidth);
    }
    get whatsappUrl() {
        const message = `${this.translations['whatsapp_text_one']} https://www.afandinacarrental.com  ${this.translations['whatsapp_text_two']} ${this.productDetails?.data.name} \n https://www.afandinacarrental.com/${this.currentLang}/product/${this.productDetails?.data.slug}`;
        return `https://wa.me/${this.contactData.whatsapp ?? ''}?text=${encodeURIComponent(message)}`;
    }
    onResize(event) {
        this.updateNumVisible(event.target.innerWidth);
    }
    updateNumVisible(width) {
        if (width < 576) {
            this.numVisible = 1; // For extra small screens
        }
        else if (width >= 576 && width < 768) {
            this.numVisible = 2; // For small screens
        }
        else if (width >= 768 && width < 992) {
            this.numVisible = 3; // For medium screens
        }
        else if (width >= 992 && width < 1200) {
            this.numVisible = 4; // For large screens
        }
        else {
            this.numVisible = 5; // For extra large screens
        }
    }
    getProductBySlug() {
        if (this.ProductSlug) {
            this.productService.getProductDetails(this.ProductSlug).subscribe((res) => {
                this.productDetails = res;
                this.images = res.data.images.filter(item => item.type === 'image');
                if ((0, common_1.isPlatformServer)(this.platformId)) {
                    this.seo.setMetaTags(this.productDetails.data.seo_data, 'product-show');
                    this.seo.og_property_product(this.productDetails.data);
                }
                if ((0, common_2.isPlatformBrowser)(this.platformId)) {
                    this.seo.setMetaTags(this.productDetails.data.seo_data, 'product-show');
                    this.seo.og_property_product(this.productDetails.data);
                }
            }, (error) => {
            });
        }
    }
};
tslib_1.__decorate([
    (0, core_1.HostListener)('window:resize', ['$event'])
], ProductShowComponent.prototype, "onResize", null);
exports.ProductShowComponent = ProductShowComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-product-show',
        templateUrl: './product-show.component.html',
        styleUrls: ['./product-show.component.scss']
    }),
    tslib_1.__param(5, (0, core_2.Inject)(core_2.PLATFORM_ID))
], ProductShowComponent);
//# sourceMappingURL=product-show.component.js.map