"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let StorageService = exports.StorageService = class StorageService {
    constructor(platformId) {
        this.platformId = platformId;
        this.isBrowser = (0, common_1.isPlatformBrowser)(this.platformId);
    }
    setItem(key, value) {
        if (this.isBrowser) {
            localStorage.setItem(key, value);
        }
    }
    getItem(key) {
        if (this.isBrowser) {
            return localStorage.getItem(key);
        }
        return null; // Return null if not in browser
    }
    removeItem(key) {
        if (this.isBrowser) {
            localStorage.removeItem(key);
        }
    }
    clear() {
        if (this.isBrowser) {
            localStorage.clear();
        }
    }
};
exports.StorageService = StorageService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    tslib_1.__param(0, (0, core_1.Inject)(core_1.PLATFORM_ID))
], StorageService);
//# sourceMappingURL=storage.service.js.map