"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_product_details = global_config_1.END_POINTS.product;
const API_URL_product_Filter = global_config_1.END_POINTS.filter;
const API_URL_filterData = global_config_1.END_POINTS.filterData;
let ProductService = exports.ProductService = class ProductService {
    constructor(http) {
        this.http = http;
    }
    getProductDetails(slug) {
        return this.http.get(API_URL_product_details + `/${slug}`);
    }
    getProductFilter() {
        return this.http.get(API_URL_product_Filter);
    }
    getFilteredProducts(data) {
        return this.http.post(API_URL_filterData, data);
    }
};
exports.ProductService = ProductService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], ProductService);
//# sourceMappingURL=product.service.js.map