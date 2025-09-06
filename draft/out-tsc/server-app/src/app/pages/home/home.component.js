"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const swiper_1 = require("swiper");
const common_1 = require("@angular/common");
const core_2 = require("@angular/core");
const common_2 = require("@angular/common");
swiper_1.default.use([swiper_1.Autoplay]);
let HomeComponent = exports.HomeComponent = class HomeComponent {
    constructor(platformId, homeService, sharedDataService, languageService, router, translationService, seo) {
        this.platformId = platformId;
        this.homeService = homeService;
        this.sharedDataService = sharedDataService;
        this.languageService = languageService;
        this.router = router;
        this.translationService = translationService;
        this.seo = seo;
        this.currentLang = 'en';
        this.translations = {};
        this.isPlaying = {};
        this.swiperConfig = {
            speed: 500,
            preloadImages: false,
            lazy: true,
            watchSlidesProgress: true,
            virtual: false,
            breakpoints: {
                320: { slidesPerView: 3.10, spaceBetween: 10 },
                480: { slidesPerView: 3.10, spaceBetween: 15 },
                640: { slidesPerView: 4.10, spaceBetween: 15 },
                768: { slidesPerView: 5.10, spaceBetween: 20 },
                1024: { slidesPerView: 6.10, spaceBetween: 20 },
                1280: { slidesPerView: 7.10, spaceBetween: 20 }
            }
        };
        this.swiperBrand = {
            speed: 500,
            preloadImages: false,
            lazy: true,
            watchSlidesProgress: true,
            virtual: false,
            breakpoints: {
                320: { slidesPerView: 3.10, spaceBetween: 10 },
                480: { slidesPerView: 3.10, spaceBetween: 15 },
                640: { slidesPerView: 4.10, spaceBetween: 15 },
                768: { slidesPerView: 5.10, spaceBetween: 20 },
                1024: { slidesPerView: 6.10, spaceBetween: 20 },
                1280: { slidesPerView: 7.10, spaceBetween: 20 }
            }
        };
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
        this.swiperBlog = {
            breakpoints: {
                320: { slidesPerView: 1.10 },
                480: { slidesPerView: 1.10 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        };
        this.currentIndex = 0;
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
        this.getHome();
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            this.sharedDataService.categories$.subscribe((res) => {
                this.categoriesSection = res;
            });
            this.sharedDataService.brands$.subscribe((res) => {
                this.brandsSection = res;
            });
            this.sharedDataService.locations$.subscribe((res) => {
                this.locationSection = res;
            });
        }
        this.getFaqs();
        this.getBlogs();
        if ((0, common_2.isPlatformServer)(this.platformId)) {
            this.seo.updateMetadataForType('home');
        }
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            this.seo.updateMetadataForType('home');
        }
    }
    ngAfterViewInit() {
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            const videoElement = document.querySelector('video');
            if (videoElement) {
                videoElement.muted = true;
            }
        }
    }
    getHome() {
        this.homeService.getHome().subscribe((res) => {
            this.headerSection = res.data.header_section;
            this.onlyOnAfandinaSection = res.data.only_on_afandina_section;
            this.specialOffersSection = res.data.special_offers_section;
            this.whyChooseUsSection = res.data.why_choose_us_section;
            this.documentSection = res.data.document_section;
            this.instagramSection = res.data.short_videos_section;
            this.where_find_us = res.data.where_find_us;
            this.advertisements = res.data.advertisements;
        });
    }
    togglePlayPause(videoPlayer, videoItem) {
        if (videoPlayer.paused) {
            videoPlayer.play();
            this.isPlaying[videoItem.id] = true;
        }
        else {
            videoPlayer.pause();
            this.isPlaying[videoItem.id] = false;
        }
    }
    getFaqs() {
        this.homeService.getFaqs().subscribe((res) => {
            this.faqsSection = res;
        });
    }
    getBlogs() {
        this.homeService.getBlogs().subscribe((res) => {
            this.blogs = res;
        });
    }
};
exports.HomeComponent = HomeComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    }),
    tslib_1.__param(0, (0, core_2.Inject)(core_2.PLATFORM_ID))
], HomeComponent);
//# sourceMappingURL=home.component.js.map