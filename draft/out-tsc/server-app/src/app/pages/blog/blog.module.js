"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const blog_routing_module_1 = require("./blog-routing.module");
const blog_list_component_1 = require("./blog-list/blog-list.component");
const blog_details_component_1 = require("./blog-details/blog-details.component");
const shared_module_1 = require("src/app/shared/shared.module");
let BlogModule = exports.BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            blog_list_component_1.BlogListComponent,
            blog_details_component_1.BlogDetailsComponent
        ],
        imports: [
            common_1.CommonModule,
            blog_routing_module_1.BlogRoutingModule,
            shared_module_1.SharedModule
        ]
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map