import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { Response } from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
import 'localstorage-polyfill';
import * as compression from 'compression';  // إضافة مكتبة compression
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import * as mcache from 'memory-cache';

global['localStorage'] = localStorage;

// Cache middleware with type-safe implementation
const cacheMiddleware = (duration: number) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const key = '__express__' + req.originalUrl || req.url;
        const cachedBody = mcache.get(key);

        if (cachedBody) {
            res.send(cachedBody);
            return;
        }

        const originalSend = res.send.bind(res);
        res.send = function(body: any): Response {
            mcache.put(key, body, duration * 1000);
            return originalSend(body);
        };
        next();
    }
};

export function app(): express.Express {
    const server = express();
    
    // Compression middleware
    server.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) return false;
            return compression.filter(req, res);
        },
        level: 6 // أعلى مستوى ضغط
    }));

    const distFolder = join(process.cwd(), 'dist/my-angular-project/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    // تحسين أداء Express
    server.set('trust proxy', 1);
    server.disable('x-powered-by');
    
    // محرك Universal مع تحسينات
    server.engine('html', ngExpressEngine({
        bootstrap: AppServerModule,
        inlineCriticalCss: true, // تفعيل inline critical CSS
    }));

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Cache للملفات الثابتة
    server.use(express.static(distFolder, {
        maxAge: '1y',
        etag: true,
        lastModified: true
    }));

    // التعامل مع كافة الطرق مع cache
    server.get('*', cacheMiddleware(30), (req, res) => {
        // Extract language from URL
        const pathSegments = req.path.split('/').filter(segment => segment);
        const defaultLang = 'en';
        const lang = pathSegments.length > 0 && /^[a-z]{2}$/i.test(pathSegments[0]) 
            ? pathSegments[0] 
            : defaultLang;

        // Set language in headers
        req.headers['accept-language'] = lang;

        res.render(indexHtml, {
            req,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },
                { provide: REQUEST, useValue: req },
                { provide: RESPONSE, useValue: res },
                { provide: 'LANGUAGE', useValue: lang },
                { provide: 'SSR', useValue: true }
            ]
        });
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    // بدء الخادم
    const server = app();
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
