"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const about_us_component_1 = require("./about-us/about-us.component");
const routes = [
    { path: '', component: about_us_component_1.AboutUsComponent },
];
let AboutRoutingModule = exports.AboutRoutingModule = class AboutRoutingModule {
};
exports.AboutRoutingModule = AboutRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], AboutRoutingModule);
//# sourceMappingURL=about-routing.module.js.map