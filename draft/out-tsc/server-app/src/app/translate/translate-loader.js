"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranslateLoader = void 0;
const http_loader_1 = require("@ngx-translate/http-loader");
// Function that returns a TranslateHttpLoader instance
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
//# sourceMappingURL=translate-loader.js.map