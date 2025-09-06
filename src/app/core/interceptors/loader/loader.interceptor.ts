import { Injectable } from '@angular/core';
import {

  HttpRequest,

  HttpHandler,

  HttpEvent,

  HttpInterceptor

} from '@angular/common/http';

import { finalize, Observable } from 'rxjs';

import { LoaderService } from '../../services/loader/loader.service';



@Injectable()

export class LoaderInterceptor implements HttpInterceptor {

  private excludedUrl = '/api/contact-us/send-message';

  private excludedUrl2 = '/api/search';



  constructor(private loaderService: LoaderService) {}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const shouldShowLoader = !req.url.includes(this.excludedUrl);

    const shouldShowLoader2 = !req.url.includes(this.excludedUrl2);



    if (shouldShowLoader && shouldShowLoader2) {

      this.loaderService.show();

    }



    return next.handle(req).pipe(

      finalize(() => {

        if (shouldShowLoader) {

          this.loaderService.hide();

        }

      })

    );

  }

}



