"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const header_component_1 = require("./header/header.component");
const footer_component_1 = require("./footer/footer.component");
const navbar_component_1 = require("./navbar/navbar.component");
const router_1 = require("@angular/router");
const dialog_1 = require("primeng/dialog");
const shared_module_1 = require("../shared/shared.module"); // for dialogs
let LayoutsModule = exports.LayoutsModule = class LayoutsModule {
};
exports.LayoutsModule = LayoutsModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            navbar_component_1.NavbarComponent
        ],
        imports: [
            common_1.CommonModule,
            router_1.RouterModule,
            dialog_1.DialogModule,
            shared_module_1.SharedModule
        ],
        exports: [
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            navbar_component_1.NavbarComponent
        ]
    })
], LayoutsModule);
//# sourceMappingURL=layouts.module.js.map