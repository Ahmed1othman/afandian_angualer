"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let TranslationService = exports.TranslationService = class TranslationService {
    constructor() {
        this.translations = new rxjs_1.BehaviorSubject({});
    }
    setTranslations(data) {
        this.translations.next(data);
    }
    getTranslations() {
        return this.translations.asObservable();
    }
    translate(key) {
        const currentTranslations = this.translations.getValue();
        return currentTranslations[key] || key;
    }
};
exports.TranslationService = TranslationService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], TranslationService);
//# sourceMappingURL=translation.service.js.map