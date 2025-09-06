import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || 
            (error.error && 
             error.error.message === 'Object not found' && 
             error.error.errors?.includes('No query results for model'))) {
          const currentLang = this.languageService.getCurrentLanguage();
          this.router.navigate(['/', currentLang, '404']);
        }
        return throwError(() => error);
      })
    );
  }
}
