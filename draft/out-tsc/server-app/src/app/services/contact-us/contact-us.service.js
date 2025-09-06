"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_config_1 = require("src/app/core/globals/global-config");
const API_URL_contactus = global_config_1.END_POINTS.contactus;
const send_contact = global_config_1.END_POINTS.send_contact;
let ContactUsService = exports.ContactUsService = class ContactUsService {
    constructor(http) {
        this.http = http;
    }
    getContactUsData() {
        return this.http.get(API_URL_contactus);
    }
    send_contact(contactus) {
        return this.http.post(send_contact, contactus);
    }
};
exports.ContactUsService = ContactUsService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], ContactUsService);
//# sourceMappingURL=contact-us.service.js.map