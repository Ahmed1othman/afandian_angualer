"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const core_2 = require("@angular/core");
const swiper_1 = require("swiper");
swiper_1.default.use([swiper_1.Pagination, swiper_1.Autoplay]);
let CardComponent = exports.CardComponent = class CardComponent {
    constructor(languageService, sharedDataService, sanitizer, router, translationService, cdr, platformId) {
        this.languageService = languageService;
        this.sharedDataService = sharedDataService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.translationService = translationService;
        this.cdr = cdr;
        this.platformId = platformId;
        this.currentLang = 'en';
        this.translations = {};
        this.currency_name = localStorage.getItem('currency_name');
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            const value = localStorage.getItem('someKey');
        }
    }
    get whatsappUrl(){
        const message = `${this.translations['whatsapp_text_one']} https://www.afandinacarrental.com  ${this.translations['whatsapp_text_two']} ${this.carData.name} \n https://www.afandinacarrental.com/${this.currentLang}/product/${this.carData.slug}`;
        return `https://wa.me/${this.contactData.whatsapp ?? ''}?text=${encodeURIComponent(message)}`;
    }
    ngOnInit() {
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.sharedDataService.currentWhatsapp.subscribe(data => {
            this.contactData = data || {}; // Get whatsapp from the service
        });
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        // this.languageService.currentCurrencyCode$.subscribe((code) => {
        //   this.currencyCode = code; // Update the local variable
        //   this.cdr.detectChanges();
        // });
    }
    getSafeYouTubeUrl(filePath) {
        const url = `https://www.youtube.com/embed/${filePath}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    getSafeVideoUrl(videoUrl) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], CardComponent.prototype, "carData", void 0);
exports.CardComponent = CardComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.scss']
    }),
    tslib_1.__param(6, (0, core_2.Inject)(core_2.PLATFORM_ID))
], CardComponent);
//# sourceMappingURL=card.component.js.map