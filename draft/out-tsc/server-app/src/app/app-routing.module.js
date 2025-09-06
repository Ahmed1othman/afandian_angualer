"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const home_component_1 = require("./pages/home/home.component");
const routes = [
    { path: '', redirectTo: '/en/home', pathMatch: 'full' },
    { path: ':lang', children: [
            { path: 'home', component: home_component_1.HomeComponent },
            { path: '', loadChildren: () => Promise.resolve().then(() => require('./pages/home/home.module')).then(m => m.HomeModule) },
            { path: 'blogs', loadChildren: () => Promise.resolve().then(() => require('./pages/blog/blog.module')).then(m => m.BlogModule) },
            { path: 'about-us', loadChildren: () => Promise.resolve().then(() => require('./pages/about/about.module')).then(m => m.AboutModule) },
            { path: 'contact-us', loadChildren: () => Promise.resolve().then(() => require('./pages/contact-us/contact-us.module')).then(m => m.ContactUsModule) },
            { path: 'product', loadChildren: () => Promise.resolve().then(() => require('./pages/product/product.module')).then(m => m.ProductModule) },
        ] },
    { path: '**', redirectTo: '/404' }
];
let AppRoutingModule = exports.AppRoutingModule = class AppRoutingModule {
};
exports.AppRoutingModule = AppRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [
            router_1.RouterModule.forRoot(routes, {
                scrollPositionRestoration: 'top',
                initialNavigation: 'enabledBlocking'
            })
        ],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
//# sourceMappingURL=app-routing.module.js.map