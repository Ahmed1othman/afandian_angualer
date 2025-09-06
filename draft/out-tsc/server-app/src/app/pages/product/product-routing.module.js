"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const product_show_component_1 = require("./product-show/product-show.component");
const product_filter_component_1 = require("./product-filter/product-filter.component");
const brands_component_1 = require("./brands/brands.component");
const categories_component_1 = require("./categories/categories.component");
const location_component_1 = require("./location/location.component");
const routes = [
    { path: 'car/:slug', component: product_show_component_1.ProductShowComponent },
    { path: 'filter', component: product_filter_component_1.ProductFilterComponent },
    { path: 'brand/:slug', component: brands_component_1.BrandsComponent },
    { path: 'category/:slug', component: categories_component_1.CategoriesComponent },
    { path: 'location/:slug', component: location_component_1.LocationComponent },
];
let ProductRoutingModule = exports.ProductRoutingModule = class ProductRoutingModule {
};
exports.ProductRoutingModule = ProductRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], ProductRoutingModule);
//# sourceMappingURL=product-routing.module.js.map