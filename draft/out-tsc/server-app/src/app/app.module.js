"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const layouts_module_1 = require("./layouts/layouts.module");
const home_component_1 = require("./pages/home/home.component");
const material_module_1 = require("./shared-modules/material/material.module");
const angular_1 = require("swiper_angular");
const animations_1 = require("@angular/platform-browser/animations");
const http_1 = require("@angular/common/http");
const core_2 = require("@ngx-translate/core");
const translate_loader_1 = require("./translate/translate-loader");
const shared_module_1 = require("./shared/shared.module");
const language_currency_interceptor_1 = require("./core/interceptors/language-currency.interceptor");
const router_1 = require("@angular/router");
const loader_interceptor_1 = require("./core/interceptors/loader/loader.interceptor");
const loader_service_1 = require("./core/services/loader/loader.service");
const language_service_1 = require("./core/services/language.service");
const translation_service_1 = require("./core/services/Translation/translation.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule.withServerTransition({ appId: 'my-angular-project' }),
            app_routing_module_1.AppRoutingModule,
            layouts_module_1.LayoutsModule,
            material_module_1.MaterialModule,
            angular_1.SwiperModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpClientModule,
            router_1.RouterModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: (translate_loader_1.createTranslateLoader),
                    deps: [http_1.HttpClient]
                },
                defaultLanguage: 'en'
            }),
            shared_module_1.SharedModule,
        ],
        providers: [
            { provide: http_1.HTTP_INTERCEPTORS, useClass: language_currency_interceptor_1.LanguageCurrencyInterceptor, multi: true },
            {
                provide: http_1.HTTP_INTERCEPTORS,
                useClass: loader_interceptor_1.LoaderInterceptor,
                multi: true
            },
            loader_service_1.LoaderService,
            language_service_1.LanguageService,
            translation_service_1.TranslationService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map