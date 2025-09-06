"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_footer = global_config_1.END_POINTS.footer;
let FooterService = exports.FooterService = class FooterService {
    constructor(http) {
        this.http = http;
    }
    getFooterData() {
        return this.http.get(API_URL_footer);
    }
};
exports.FooterService = FooterService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], FooterService);
//# sourceMappingURL=footer.service.js.map