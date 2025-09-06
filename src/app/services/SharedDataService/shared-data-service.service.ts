import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrandsSection, CategoriesSection, LocationSection } from 'src/app/Models/home.model';
import { filter, shareReplay, tap } from 'rxjs/operators';
import { END_POINTS } from 'src/app/core/globals/global-config';
const API_URL_brands = END_POINTS.brands;
const API_URL_locations = END_POINTS.locations;
const API_URL_categories = END_POINTS.categories;
const currencies = END_POINTS.currencies;

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {


  private whatsappSource = new BehaviorSubject<string | null>(null);
  currentWhatsapp = this.whatsappSource.asObservable();

  public crruncies$ = this.http.get<any>(currencies).pipe(
    tap((res) => this.crrunciesSubject.next(res)),
    shareReplay(1) 
  );

  public brands$ = this.http.get<BrandsSection>(API_URL_brands).pipe(
    tap((res) => this.brandsSubject.next(res)),
    shareReplay(1) 
  );

  public categories$ = this.http.get<CategoriesSection>(API_URL_categories).pipe(
    tap((res) => this.categoriesSubject.next(res)),
    shareReplay(1) 
  );

  public locations$ = this.http.get<LocationSection>(API_URL_locations).pipe(
    tap((res) => this.locationsSubject.next(res)),
    shareReplay(1) 
  );

  private categoriesSubject = new BehaviorSubject<CategoriesSection | null>(null);
  private brandsSubject = new BehaviorSubject<BrandsSection | null>(null);
  private locationsSubject = new BehaviorSubject<LocationSection | null>(null);
  private crrunciesSubject = new BehaviorSubject<any | null>(null);



  constructor(private http: HttpClient) { }

  

  updateCategories(categories: CategoriesSection) {
    this.categoriesSubject.next(categories);
  }

  updateBrands(brands: BrandsSection) {
    this.brandsSubject.next(brands);
  }

  contactData(date: string) {
    this.whatsappSource.next(date);
  }

}
