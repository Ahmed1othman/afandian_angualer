import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/globals/global-config';
import { BlogData, BrandsSection, CategoriesSection, FaqsSection, HomeResponse, LocationSection } from 'src/app/Models/home.model';


const API_URL_home = END_POINTS.home;
const locations = END_POINTS.locations;
const API_URL_settings = END_POINTS.settings;
const API_URL_brand = END_POINTS.brand;
const API_URL_blogs = END_POINTS.blogs;
const API_URL_faqs = END_POINTS.faqs;
const API_URL_category = END_POINTS.category;
const showlocation = END_POINTS.showlocation;
const API_URL_search = END_POINTS.search;
const seo = END_POINTS.seo;
const currencies = END_POINTS.currencies;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 
  constructor(private http: HttpClient) { }

 
  
  getHome(){
    return this.http.get<HomeResponse>(API_URL_home);
  }

  getAllLocation(){
    return this.http.get<any>(locations);
  }

  getSettings(){
    return this.http.get<any>(API_URL_settings);
  }

  // getBrands(){
  //   return this.http.get<BrandsSection>(API_URL_brands);
  // }

  // getLocations(){
  //   return this.http.get<LocationSection>(API_URL_locations);
  // }

  getFaqs(){
    return this.http.get<FaqsSection>(API_URL_faqs);
  }

  // getCategories(){
  //   return this.http.get<CategoriesSection>(API_URL_categories);
  // }

  getBlogs(){
    return this.http.get<BlogData>(API_URL_blogs);
  }

  getSearch(data: { query: string }): Observable<any> {
    return this.http.post<any>(API_URL_search, data);
  }

  getSeo() {
    return this.http.get<any>(seo);
  }

  getBrandDetails(slug: string): Observable<any> {
    return this.http.get<any>(API_URL_brand + `/${slug}`);
  }

  getCaategoryDetails(slug: string): Observable<any> {
    return this.http.get<any>(API_URL_category + `/${slug}`);
  }

  getCrruncies() {
    return this.http.get<any>(currencies);
  }

  getlocationDetails(slug: string): Observable<any> {
    return this.http.get<any>(showlocation + `/${slug}`);

  }
  
}
