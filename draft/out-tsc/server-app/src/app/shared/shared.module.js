"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const card_component_1 = require("./components/card/card.component");
const card_1 = require("primeng/card");
const banner_head_component_1 = require("./components/banner-head/banner-head.component");
const card_blog_component_1 = require("./components/card-blog/card-blog.component");
const carousel_1 = require("primeng/carousel");
const router_1 = require("@angular/router");
const language_component_1 = require("./components/language/language.component");
const search_component_1 = require("./components/search/search.component");
const galleria_1 = require("primeng/galleria");
const currency_component_1 = require("./components/currency/currency.component");
const angular_1 = require("swiper_angular");
let SharedModule = exports.SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            card_component_1.CardComponent,
            banner_head_component_1.BannerHeadComponent,
            card_blog_component_1.CardBlogComponent,
            language_component_1.LanguageComponent,
            search_component_1.SearchComponent,
            currency_component_1.CurrencyComponent
        ],
        imports: [
            common_1.CommonModule,
            card_1.CardModule,
            carousel_1.CarouselModule,
            router_1.RouterModule,
            galleria_1.GalleriaModule,
            angular_1.SwiperModule
        ],
        exports: [
            card_component_1.CardComponent,
            banner_head_component_1.BannerHeadComponent,
            card_blog_component_1.CardBlogComponent,
            language_component_1.LanguageComponent,
            search_component_1.SearchComponent,
            currency_component_1.CurrencyComponent
        ],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map