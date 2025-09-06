"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_blogs = global_config_1.END_POINTS.blogs;
let BlogService = exports.BlogService = class BlogService {
    constructor(http) {
        this.http = http;
    }
    getBlogs() {
        return this.http.get(API_URL_blogs);
    }
    getBlog(slug) {
        return this.http.get(API_URL_blogs + `/${slug}`);
    }
};
exports.BlogService = BlogService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], BlogService);
//# sourceMappingURL=blog.service.js.map