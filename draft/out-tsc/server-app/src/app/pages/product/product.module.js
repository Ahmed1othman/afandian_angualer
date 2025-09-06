"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const product_routing_module_1 = require("./product-routing.module");
const product_filter_component_1 = require("./product-filter/product-filter.component");
const product_show_component_1 = require("./product-show/product-show.component");
const galleria_1 = require("primeng/galleria");
const card_1 = require("primeng/card");
const shared_module_1 = require("../../shared/shared.module");
const angular_1 = require("swiper_angular");
const accordion_1 = require("primeng/accordion");
const ngx_slider_1 = require("@angular-slider/ngx-slider");
const forms_1 = require("@angular/forms");
const forms_2 = require("@angular/forms");
const brands_component_1 = require("./brands/brands.component");
const categories_component_1 = require("./categories/categories.component");
const only_us_component_1 = require("./only-us/only-us.component"); // Import FormsModule
const image_1 = require("primeng/image");
const location_component_1 = require("./location/location.component");
let ProductModule = exports.ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            product_filter_component_1.ProductFilterComponent,
            product_show_component_1.ProductShowComponent,
            brands_component_1.BrandsComponent,
            categories_component_1.CategoriesComponent,
            only_us_component_1.OnlyUsComponent,
            location_component_1.LocationComponent
        ],
        imports: [
            common_1.CommonModule,
            product_routing_module_1.ProductRoutingModule,
            galleria_1.GalleriaModule,
            card_1.CardModule,
            shared_module_1.SharedModule,
            angular_1.SwiperModule,
            accordion_1.AccordionModule,
            ngx_slider_1.NgxSliderModule,
            forms_1.ReactiveFormsModule,
            forms_2.FormsModule,
            image_1.ImageModule
        ]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map