"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
let ContactUsComponent = exports.ContactUsComponent = class ContactUsComponent {
    constructor(contactusService, languageService, translationService, sanitizer, router, fb) {
        this.contactusService = contactusService;
        this.languageService = languageService;
        this.translationService = translationService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.fb = fb;
        this.translations = {};
        this.sanitizedGoogleMapUrl = null;
        this.isLoading = false;
        this.contactUsData = null;
        this.currentLang = 'en';
    }
    ngOnInit() {
        this.translationService.getTranslations().subscribe((data) => {
            this.translations = data;
        });
        this.contactusForm = new forms_1.FormGroup({
            full_name: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.maxLength(100),
                forms_1.Validators.pattern(/^[a-zA-Z\s]+$/) // Ensures name is a string
            ]),
            email: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.email,
                forms_1.Validators.pattern(/(.+)@(.+)\.(.+)/i),
                forms_1.Validators.minLength(2),
                forms_1.Validators.maxLength(200)
            ]),
            phone: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.minLength(10),
                forms_1.Validators.maxLength(15),
                forms_1.Validators.pattern(/^\d+$/) // Ensures the phone contains only digits
            ]),
            subject: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.maxLength(100),
                forms_1.Validators.pattern(/^[a-zA-Z\s]+$/) // Ensures company name is a string
            ]),
            message: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.maxLength(10000)
            ])
        });
        this.currentLang = this.languageService.getCurrentLanguage();
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.currentLang = this.languageService.getCurrentLanguage();
            }
        });
        this.contactusService.getContactUsData().subscribe((res) => {
            this.contactUsData = res;
            if (this.contactUsData.data.google_map_url) {
                this.sanitizedGoogleMapUrl = this.sanitizer.bypassSecurityTrustHtml(this.contactUsData.data.google_map_url);
            }
        }, (error) => {
        });
    }
    onSubmit() {
        if (this.contactusForm.valid) {
            this.isLoading = true; // Start loading
            const contactData = this.contactusForm.value; // Retrieve form data
            this.contactusService.send_contact(contactData).subscribe((res) => {
                this.contactusForm.reset(); // Reset the form
                this.message = 'Data Sent Successfully'; // Set success message
                this.isLoading = false; // Stop loading
                // Clear message after 3 seconds
                setTimeout(() => {
                    this.message = null;
                }, 3000);
            }, (error) => {
                this.isLoading = false;
                this.message = error.errors;
            });
        }
    }
};
exports.ContactUsComponent = ContactUsComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-contact-us',
        templateUrl: './contact-us.component.html',
        styleUrls: ['./contact-us.component.scss']
    })
], ContactUsComponent);
//# sourceMappingURL=contact-us.component.js.map