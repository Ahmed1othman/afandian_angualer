import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-blog',
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.scss']
})
export class CardBlogComponent implements OnInit, OnDestroy {
  @Input() blogData: any;
  translations: Record<string, string> = {};
  currentLang: string = 'en';
  private translationsSubscription: Subscription | undefined;

  constructor(
    private translationService: TranslationService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  ngOnInit() {
    this.translationsSubscription = this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
  }

  ngOnDestroy() {
    if (this.translationsSubscription) {
      this.translationsSubscription.unsubscribe();
    }
  }
}
