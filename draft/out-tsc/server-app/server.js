"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
require("zone.js/node");
const common_1 = require("@angular/common");
const express_engine_1 = require("@nguniversal/express-engine");
const express = require("express");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const main_server_1 = require("./src/main.server");
require("localstorage-polyfill");
const compression = require("compression"); // إضافة مكتبة compression
global['localStorage'] = localStorage;
function app() {
    const server = express();
    // إضافة middleware لضغط الملفات
    server.use(compression()); // تفعيل الضغط باستخدام Gzip أو Brotli
    const distFolder = (0, node_path_1.join)(process.cwd(), 'dist/my-angular-project/browser');
    const indexHtml = (0, node_fs_1.existsSync)((0, node_path_1.join)(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
    // محرك Universal
    server.engine('html', (0, express_engine_1.ngExpressEngine)({
        bootstrap: main_server_1.AppServerModule,
    }));
    server.set('view engine', 'html');
    server.set('views', distFolder);
    // Serve static files
    server.get('*.*', express.static(distFolder, {
        maxAge: '1y'
    }));
    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        // Extract language from the first part of the path
        const pathSegments = req.path.split('/').filter(segment => segment);
        const defaultLang = 'en';
        // Get language from the first path segment
        const lang = pathSegments.length > 0 ? pathSegments[0] : defaultLang;
        // Set the Accept-Language header for the initial request
        req.headers['accept-language'] = lang || defaultLang;
        res.render(indexHtml, {
            req,
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: req.baseUrl },
                { provide: 'LANGUAGE', useValue: lang || defaultLang }
            ]
        });
    });
    return server;
}
exports.app = app;
function run() {
    const port = process.env['PORT'] || 4000;
    // بدء الخادم
    const server = app();
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}
tslib_1.__exportStar(require("./src/main.server"), exports);
//# sourceMappingURL=server.js.map