import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/globals/global-config';
import { AboutUsResponse } from 'src/app/Models/about.model';

const API_URL_aboutus = END_POINTS.aboutus;

@Injectable({
  providedIn: 'root'
})

export class AboutUsService {

  constructor(private http: HttpClient) {}

  getAboutUsData(): Observable<AboutUsResponse> {
    return this.http.get<AboutUsResponse>(API_URL_aboutus);
  }

}
