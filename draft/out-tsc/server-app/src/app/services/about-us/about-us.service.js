"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUsService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_aboutus = global_config_1.END_POINTS.aboutus;
let AboutUsService = exports.AboutUsService = class AboutUsService {
    constructor(http) {
        this.http = http;
    }
    getAboutUsData() {
        return this.http.get(API_URL_aboutus);
    }
};
exports.AboutUsService = AboutUsService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], AboutUsService);
//# sourceMappingURL=about-us.service.js.map