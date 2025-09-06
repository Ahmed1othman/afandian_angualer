"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LoaderService = exports.LoaderService = class LoaderService {
    constructor() {
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    show() {
        this.loadingSubject.next(true);
        setTimeout(() => {
            this.hide();
        }, 3000); // Hide after 3 seconds
    }
    hide() {
        this.loadingSubject.next(false);
    }
};
exports.LoaderService = LoaderService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], LoaderService);
//# sourceMappingURL=loader.service.js.map