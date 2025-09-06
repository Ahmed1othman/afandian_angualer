"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const blog_list_component_1 = require("./blog-list/blog-list.component");
const blog_details_component_1 = require("./blog-details/blog-details.component");
const routes = [
    { path: '', component: blog_list_component_1.BlogListComponent },
    { path: ':slug', component: blog_details_component_1.BlogDetailsComponent },
];
let BlogRoutingModule = exports.BlogRoutingModule = class BlogRoutingModule {
};
exports.BlogRoutingModule = BlogRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], BlogRoutingModule);
//# sourceMappingURL=blog-routing.module.js.map