"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.END_POINTS = exports.MusahmAPI_URL = exports.BaseURL = void 0;
const environment_1 = require("src/environments/environment");
exports.BaseURL = environment_1.environment.apiUrl;
exports.MusahmAPI_URL = exports.BaseURL + environment_1.environment.api_key;
class END_POINTS {
    static { this.home = exports.MusahmAPI_URL + 'home'; }
    static { this.settings = exports.MusahmAPI_URL + 'get-main-settings'; }
    static { this.brands = exports.MusahmAPI_URL + 'brands'; }
    static { this.brand = exports.MusahmAPI_URL + 'cars/brand'; }
    static { this.locations = exports.MusahmAPI_URL + 'locations'; }
    static { this.faqs = exports.MusahmAPI_URL + 'faqs'; }
    static { this.categories = exports.MusahmAPI_URL + 'categories'; }
    static { this.category = exports.MusahmAPI_URL + 'cars/category'; }
    static { this.showlocation = exports.MusahmAPI_URL + 'cars/location'; }
    static { this.footer = exports.MusahmAPI_URL + 'get-footer'; }
    static { this.blogs = exports.MusahmAPI_URL + 'blogs'; }
    static { this.search = exports.MusahmAPI_URL + 'search'; }
    static { this.aboutus = exports.MusahmAPI_URL + 'about-us'; }
    static { this.contactus = exports.MusahmAPI_URL + 'contact-us'; }
    static { this.send_contact = exports.MusahmAPI_URL + 'contact-us/send-message'; }
    static { this.product = exports.MusahmAPI_URL + 'cars'; }
    static { this.filter = exports.MusahmAPI_URL + 'advanced-search-setting'; }
    static { this.filterData = exports.MusahmAPI_URL + 'advanced-search'; }
    static { this.seo = exports.MusahmAPI_URL + 'seo-pages'; }
    static { this.currencies = exports.MusahmAPI_URL + 'currencies'; }
}
exports.END_POINTS = END_POINTS;
//# sourceMappingURL=global-config.js.map