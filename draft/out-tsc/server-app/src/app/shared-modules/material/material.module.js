"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const carousel_1 = require("primeng/carousel");
const card_1 = require("primeng/card");
const accordion_1 = require("primeng/accordion");
let MaterialModule = exports.MaterialModule = class MaterialModule {
};
exports.MaterialModule = MaterialModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [
            common_1.CommonModule,
            carousel_1.CarouselModule,
            card_1.CardModule,
            accordion_1.AccordionModule
        ],
        exports: [
            carousel_1.CarouselModule,
            card_1.CardModule,
            accordion_1.AccordionModule
        ],
        providers: [],
    })
], MaterialModule);
//# sourceMappingURL=material.module.js.map