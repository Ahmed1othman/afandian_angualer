"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFilterComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let ProductFilterComponent = exports.ProductFilterComponent = class ProductFilterComponent {
    constructor(productService, fb, route, languageService, router, translationService) {
        this.productService = productService;
        this.fb = fb;
        this.route = route;
        this.languageService = languageService;
        this.router = router;
        this.translationService = translationService;
        this.activePanels = [];
        this.isArabic = false;
        this.minValue = 100;
        this.maxValue = 20000;
        this.activeIndex = [0, 1, 2, 3, 4];
        this.sliderOptions = {
            floor: 0,
            ceil: 2000,
            translate: (value) => {
                return `${value}`;
            }
        };
        this.translations = {};
        this.selectedCategories = [];
        this.selectedBrands = [];
        this.selectedColors = [];
        this.selectedTransmissions = [];
        this.currentLang = 'en';
        this.productFilterForm = this.fb.group({
            brand_id: [[]],
            category_id: [[]],
            color_id: [[]],
            gear_type_id: [[]],
            luggage_capacity: [null],
            daily_main_price: [[100, 50000]],
            weekly_main_price: [[100, 50000]],
            monthly_main_price: [[100, 50000]],
            word: [''],
        });
    }
    applyPriceFilter() {
        const filterParams = {
            min_price: this.minValue,
            max_price: this.maxValue,
        };
    }
    ngOnInit() {
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        // Assuming you have a dynamic panel count (e.g., from an array of data)
        const numberOfPanels = 5;
        this.activePanels = Array.from({ length: numberOfPanels }, (_, index) => index);
        this.route.queryParams.subscribe(params => {
            if (params['category']) {
                this.selectedCategories = [parseInt(params['category'], 10)];
            }
            if (params['brand']) {
                this.selectedBrands = [parseInt(params['brand'], 10)];
            }
            // Trigger the filter with the selected values
            this.submitFilter();
        });
        this.getFilterData();
        this.submitFilter();
    }
    getFilterData() {
        this.productService.getProductFilter().subscribe((res) => {
            this.productFilter = res;
        });
    }
    updateSelectedCategories(id, event) {
        const checked = event.target.checked;
        if (checked) {
            if (!this.selectedCategories.includes(id)) {
                this.selectedCategories.push(id); // Only add if not already in the array
            }
        }
        else {
            this.selectedCategories = this.selectedCategories.filter(item => item !== id); // Remove if unchecked
        }
        this.submitFilter();
    }
    // Update functions for brands
    updateSelectedBrands(id, event) {
        const checked = event.target.checked;
        if (checked) {
            if (!this.selectedBrands.includes(id)) {
                this.selectedBrands.push(id); // Add brand ID if not already selected
            }
        }
        else {
            this.selectedBrands = this.selectedBrands.filter(item => item !== id); // Remove brand ID if unchecked
        }
        this.submitFilter();
    }
    // Update for Colors
    updateSelectedColors(id, event) {
        const checked = event.target.checked;
        if (checked) {
            if (!this.selectedColors.includes(id)) {
                this.selectedColors.push(id); // Add color ID if not already selected
            }
        }
        else {
            this.selectedColors = this.selectedColors.filter(item => item !== id); // Remove color ID if unchecked
        }
        this.submitFilter();
    }
    // Update for Transmissions
    updateSelectedTransmissions(id, event) {
        const checked = event.target.checked;
        if (checked) {
            if (!this.selectedTransmissions.includes(id)) {
                this.selectedTransmissions.push(id); // Add transmission ID if not already selected
            }
        }
        else {
            this.selectedTransmissions = this.selectedTransmissions.filter(item => item !== id); // Remove transmission ID if unchecked
        }
        this.submitFilter();
    }
    onPriceChange() {
        this.submitFilter();
    }
    submitFilter() {
        const filters = {
            category_id: this.selectedCategories,
            brand_id: this.selectedBrands,
            color_id: this.selectedColors,
            gear_type_id: this.selectedTransmissions,
            daily_main_price: [this.minValue, this.maxValue],
        };
        this.productService.getFilteredProducts({ filters }).subscribe((res) => {
            this.filterData = res.data;
        });
    }
    clearFilter() {
        this.selectedCategories = [];
        this.selectedBrands = [];
        this.selectedColors = [];
        this.selectedTransmissions = [];
        this.minValue = 0;
        this.maxValue = 10000;
        const filters = {};
        this.productService.getFilteredProducts({ filters }).subscribe((res) => {
            this.filterData = res.data;
        });
    }
};
exports.ProductFilterComponent = ProductFilterComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-product-filter',
        templateUrl: './product-filter.component.html',
        styleUrls: ['./product-filter.component.scss']
    })
], ProductFilterComponent);
//# sourceMappingURL=product-filter.component.js.map