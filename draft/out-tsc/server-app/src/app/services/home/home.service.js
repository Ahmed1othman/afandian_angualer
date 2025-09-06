"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_home = global_config_1.END_POINTS.home;
const locations = global_config_1.END_POINTS.locations;
const API_URL_settings = global_config_1.END_POINTS.settings;
const API_URL_brand = global_config_1.END_POINTS.brand;
const API_URL_blogs = global_config_1.END_POINTS.blogs;
const API_URL_faqs = global_config_1.END_POINTS.faqs;
const API_URL_category = global_config_1.END_POINTS.category;
const showlocation = global_config_1.END_POINTS.showlocation;
const API_URL_search = global_config_1.END_POINTS.search;
const seo = global_config_1.END_POINTS.seo;
const currencies = global_config_1.END_POINTS.currencies;
let HomeService = exports.HomeService = class HomeService {
    constructor(http) {
        this.http = http;
    }
    getHome() {
        return this.http.get(API_URL_home);
    }
    getAllLocation() {
        return this.http.get(locations);
    }
    getSettings() {
        return this.http.get(API_URL_settings);
    }
    // getBrands(){
    //   return this.http.get<BrandsSection>(API_URL_brands);
    // }
    // getLocations(){
    //   return this.http.get<LocationSection>(API_URL_locations);
    // }
    getFaqs() {
        return this.http.get(API_URL_faqs);
    }
    // getCategories(){
    //   return this.http.get<CategoriesSection>(API_URL_categories);
    // }
    getBlogs() {
        return this.http.get(API_URL_blogs);
    }
    getSearch(data) {
        return this.http.post(API_URL_search, data);
    }
    getSeo() {
        return this.http.get(seo);
    }
    getBrandDetails(slug) {
        return this.http.get(API_URL_brand + `/${slug}`);
    }
    getCaategoryDetails(slug) {
        return this.http.get(API_URL_category + `/${slug}`);
    }
    getCrruncies() {
        return this.http.get(currencies);
    }
    getlocationDetails(slug) {
        return this.http.get(showlocation + `/${slug}`);
    }
};
exports.HomeService = HomeService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], HomeService);
//# sourceMappingURL=home.service.js.map