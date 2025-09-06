import { TestBed } from '@angular/core/testing';

import { LanguageCurrencyInterceptor } from './language-currency.interceptor';

describe('LanguageCurrencyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LanguageCurrencyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LanguageCurrencyInterceptor = TestBed.inject(LanguageCurrencyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
