"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const contact_us_component_1 = require("./contact-us/contact-us.component");
const routes = [
    { path: '', component: contact_us_component_1.ContactUsComponent },
];
let ContactUsRoutingModule = exports.ContactUsRoutingModule = class ContactUsRoutingModule {
};
exports.ContactUsRoutingModule = ContactUsRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], ContactUsRoutingModule);
//# sourceMappingURL=contact-us-routing.module.js.map