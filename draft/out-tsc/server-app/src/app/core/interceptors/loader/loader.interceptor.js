"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderInterceptor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LoaderInterceptor = exports.LoaderInterceptor = class LoaderInterceptor {
    constructor(loaderService) {
        this.loaderService = loaderService;
        this.excludedUrl = '/api/contact-us/send-message';
        this.excludedUrl2 = '/api/search';
    }
    intercept(req, next) {
        const shouldShowLoader = !req.url.includes(this.excludedUrl);
        const shouldShowLoader2 = !req.url.includes(this.excludedUrl2);
        if (shouldShowLoader && shouldShowLoader2) {
            this.loaderService.show();
        }
        return next.handle(req).pipe((0, rxjs_1.finalize)(() => {
            if (shouldShowLoader) {
                this.loaderService.hide();
            }
        }));
    }
};
exports.LoaderInterceptor = LoaderInterceptor = tslib_1.__decorate([
    (0, core_1.Injectable)()
], LoaderInterceptor);
//# sourceMappingURL=loader.interceptor.js.map