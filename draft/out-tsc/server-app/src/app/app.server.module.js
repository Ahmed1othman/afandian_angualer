"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServerModule = exports.serverInitializer = exports.LanguageInterceptor = exports.ServerTranslateLoader = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_server_1 = require("@angular/platform-server");
const core_2 = require("@ngx-translate/core");
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const core_3 = require("@angular/core");
const rxjs_1 = require("rxjs");
const app_module_1 = require("./app.module");
const app_component_1 = require("./app.component");
// Server-side translation loader that returns empty translations
// Real translations will be loaded from the backend
let ServerTranslateLoader = exports.ServerTranslateLoader = class ServerTranslateLoader {
    constructor(language) {
        this.language = language;
    }
    getTranslation(lang) {
        // Return empty translations since actual translations come from backend
        return (0, rxjs_1.of)({});
    }
};
exports.ServerTranslateLoader = ServerTranslateLoader = tslib_1.__decorate([
    (0, core_3.Injectable)(),
    tslib_1.__param(0, (0, core_1.Inject)('LANGUAGE'))
], ServerTranslateLoader);
// HTTP interceptor for API calls
let LanguageInterceptor = exports.LanguageInterceptor = class LanguageInterceptor {
    constructor(platformId, language) {
        this.platformId = platformId;
        this.language = language;
    }
    intercept(req, next) {
        if ((0, common_1.isPlatformServer)(this.platformId)) {
            // Add the language header to all API requests
            const langReq = req.clone({
                headers: req.headers.set('Accept-Language', this.language || 'en')
            });
            return next.handle(langReq);
        }
        return next.handle(req);
    }
};
exports.LanguageInterceptor = LanguageInterceptor = tslib_1.__decorate([
    (0, core_3.Injectable)(),
    tslib_1.__param(0, (0, core_1.Inject)(core_1.PLATFORM_ID)),
    tslib_1.__param(1, (0, core_1.Inject)('LANGUAGE'))
], LanguageInterceptor);
function serverInitializer(translate, platformId, language) {
    return () => {
        if ((0, common_1.isPlatformServer)(platformId)) {
            const lang = language || 'en';
            translate.setDefaultLang('en');
            return translate.use(lang).toPromise();
        }
        return Promise.resolve();
    };
}
exports.serverInitializer = serverInitializer;
let AppServerModule = exports.AppServerModule = class AppServerModule {
};
exports.AppServerModule = AppServerModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [
            app_module_1.AppModule,
            platform_server_1.ServerModule,
        ],
        providers: [
            {
                provide: core_2.TranslateLoader,
                useClass: ServerTranslateLoader,
                deps: ['LANGUAGE']
            },
            {
                provide: http_1.HTTP_INTERCEPTORS,
                useClass: LanguageInterceptor,
                multi: true
            },
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: serverInitializer,
                deps: [core_2.TranslateService, core_1.PLATFORM_ID, 'LANGUAGE'],
                multi: true
            }
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppServerModule);
//# sourceMappingURL=app.server.module.js.map