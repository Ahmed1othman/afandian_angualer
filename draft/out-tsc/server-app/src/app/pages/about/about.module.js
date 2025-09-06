"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const about_routing_module_1 = require("./about-routing.module");
const about_us_component_1 = require("./about-us/about-us.component");
const shared_module_1 = require("src/app/shared/shared.module");
let AboutModule = exports.AboutModule = class AboutModule {
};
exports.AboutModule = AboutModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            about_us_component_1.AboutUsComponent
        ],
        imports: [
            common_1.CommonModule,
            about_routing_module_1.AboutRoutingModule,
            shared_module_1.SharedModule
        ]
    })
], AboutModule);
//# sourceMappingURL=about.module.js.map