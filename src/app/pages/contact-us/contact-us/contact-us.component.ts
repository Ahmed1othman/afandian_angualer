import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { ContactUsResponse } from 'src/app/Models/contact.model';
import { ContactUsService } from 'src/app/services/contact-us/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactusForm!: FormGroup;
  message: any;
  currentLang: string = 'en';
  isLoading: boolean = false;
  contactUsData: ContactUsResponse | null = null;
  sanitizedGoogleMapUrl: SafeHtml | null = null;
  translations: Record<string, string> = {};

  // Track by function for better performance
  trackByFn(index: number, item: any): number {
    return item.id || index;
  }

  constructor(
    private contactusService: ContactUsService,
    private languageService: LanguageService,
    private router: Router,
    private translationService: TranslationService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    // Preload FAQ background image
    if (typeof document !== 'undefined') {  // Check for browser environment
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = 'assets/images/icon/bg-faq.webp';
      document.head.appendChild(link);
    }

    // Initialize translations and form
    this.initializeTranslations();
    this.initializeForm();
    this.loadContactData();

    // Subscribe to router events for language changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
  }

  private initializeTranslations(): void {
    this.translationService.getTranslations().subscribe(data => {
      this.translations = data;
    });

    // Set initial language
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  private initializeForm(): void {
    this.contactusForm = new FormGroup({
      full_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(/(.+)@(.+)\.(.+)/i),
        Validators.minLength(2),
        Validators.maxLength(200)
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern(/^\d+$/)
      ]),
      subject: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]),
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10000)
      ])
    });
  }

  private loadContactData(): void {
    this.contactusService.getContactUsData().subscribe(
      (res: ContactUsResponse) => {
        this.contactUsData = res;
        if (this.contactUsData.data.google_map_url) {
          this.sanitizedGoogleMapUrl = this.sanitizer.bypassSecurityTrustHtml(
            this.contactUsData.data.google_map_url
          );
        }
      },
      error => {
        console.error('Error loading contact data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.contactusForm.valid) {
      this.isLoading = true;

      const contactData = this.contactusForm.value;
      this.contactusService.send_contact(contactData).subscribe(
        (res: any) => {
          this.contactusForm.reset();
          this.message = 'Data Sent Successfully';
          this.isLoading = false;

          setTimeout(() => {
            this.message = null;
          }, 3000);
        },
        error => {
          this.isLoading = false;
          this.message = error.errors;
        }
      );
    }
  }
}
