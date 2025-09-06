"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedDataService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_brands = global_config_1.END_POINTS.brands;
const API_URL_locations = global_config_1.END_POINTS.locations;
const API_URL_categories = global_config_1.END_POINTS.categories;
const currencies = global_config_1.END_POINTS.currencies;
let SharedDataService = exports.SharedDataService = class SharedDataService {
    constructor(http) {
        this.http = http;
        this.whatsappSource = new rxjs_1.BehaviorSubject(null);
        this.currentWhatsapp = this.whatsappSource.asObservable();
        this.crruncies$ = this.http.get(currencies).pipe((0, operators_1.tap)((res) => this.crrunciesSubject.next(res)), (0, operators_1.shareReplay)(1));
        this.brands$ = this.http.get(API_URL_brands).pipe((0, operators_1.tap)((res) => this.brandsSubject.next(res)), (0, operators_1.shareReplay)(1));
        this.categories$ = this.http.get(API_URL_categories).pipe((0, operators_1.tap)((res) => this.categoriesSubject.next(res)), (0, operators_1.shareReplay)(1));
        this.locations$ = this.http.get(API_URL_locations).pipe((0, operators_1.tap)((res) => this.locationsSubject.next(res)), (0, operators_1.shareReplay)(1));
        this.categoriesSubject = new rxjs_1.BehaviorSubject(null);
        this.brandsSubject = new rxjs_1.BehaviorSubject(null);
        this.locationsSubject = new rxjs_1.BehaviorSubject(null);
        this.crrunciesSubject = new rxjs_1.BehaviorSubject(null);
    }
    updateCategories(categories) {
        this.categoriesSubject.next(categories);
    }
    updateBrands(brands) {
        this.brandsSubject.next(brands);
    }
    contactData(date) {
        this.whatsappSource.next(date);
    }
};
exports.SharedDataService = SharedDataService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], SharedDataService);
//# sourceMappingURL=shared-data-service.service.js.map