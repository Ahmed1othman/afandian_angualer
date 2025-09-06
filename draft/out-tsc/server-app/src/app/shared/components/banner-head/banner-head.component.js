"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerHeadComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let BannerHeadComponent = exports.BannerHeadComponent = class BannerHeadComponent {
};
tslib_1.__decorate([
    (0, core_1.Input)()
], BannerHeadComponent.prototype, "title", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], BannerHeadComponent.prototype, "desc", void 0);
exports.BannerHeadComponent = BannerHeadComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-banner-head',
        templateUrl: './banner-head.component.html',
        styleUrls: ['./banner-head.component.scss']
    })
], BannerHeadComponent);
//# sourceMappingURL=banner-head.component.js.map