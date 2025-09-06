import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Injectable()
export class LanguageCurrencyInterceptor implements HttpInterceptor {

  constructor(private languageService: LanguageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const language = this.languageService.getCurrentLanguage();
    const currency = this.languageService.getCurrentCurrency();

    // Clone the request to add the new headers
    const modifiedReq = req.clone({
      setHeaders: {
        'Accept-Language': language,
        'Currency': currency,
        'Access-Control-Allow-Origin': '*'

      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedReq);
  }


}
