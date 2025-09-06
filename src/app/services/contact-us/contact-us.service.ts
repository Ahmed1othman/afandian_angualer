import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/globals/global-config';
import { ContactUsResponse } from 'src/app/Models/contact.model';

const API_URL_contactus = END_POINTS.contactus;
const send_contact = END_POINTS.send_contact;


@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) {}

  getContactUsData(): Observable<ContactUsResponse> {
    return this.http.get<ContactUsResponse>(API_URL_contactus);
  }

  send_contact( contactus : any ):  Observable<any>{
    return this.http.post<any>(send_contact , contactus);
  }
}
