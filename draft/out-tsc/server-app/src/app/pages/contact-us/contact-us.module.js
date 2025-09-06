"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const contact_us_routing_module_1 = require("./contact-us-routing.module");
const contact_us_component_1 = require("./contact-us/contact-us.component");
const accordion_1 = require("primeng/accordion"); // Import AccordionModule
const forms_1 = require("@angular/forms");
let ContactUsModule = exports.ContactUsModule = class ContactUsModule {
};
exports.ContactUsModule = ContactUsModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [contact_us_component_1.ContactUsComponent],
        imports: [
            common_1.CommonModule,
            contact_us_routing_module_1.ContactUsRoutingModule,
            accordion_1.AccordionModule,
            forms_1.ReactiveFormsModule
        ]
    })
], ContactUsModule);
//# sourceMappingURL=contact-us.module.js.map