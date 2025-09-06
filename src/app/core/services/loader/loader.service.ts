import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({

  providedIn: 'root'

})

export class LoaderService {



  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();



  show(): void {

    this.loadingSubject.next(true);

    setTimeout(() => {

      this.hide();

    }, 3000);  // Hide after 3 seconds

  }



  hide(): void {

    this.loadingSubject.next(false);

  }

}

