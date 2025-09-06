import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/globals/global-config';
import { FooterData } from 'src/app/Models/footer.model';
const API_URL_footer = END_POINTS.footer;

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http: HttpClient) {}

  getFooterData(): Observable<FooterData> {
    return this.http.get<FooterData>(API_URL_footer);
  }
}
