import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/globals/global-config';
import { FilterData } from 'src/app/Models/filterData.model';
import { Product, ProductResource } from 'src/app/Models/product.model';

const API_URL_product_details = END_POINTS.product;
const API_URL_product_Filter = END_POINTS.filter;
const API_URL_filterData = END_POINTS.filterData;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductDetails(slug: string): Observable<ProductResource> {
    return this.http.get<ProductResource>(API_URL_product_details + `/${slug}`);
  }

  getProductFilter(): Observable<FilterData> {
    return this.http.get<FilterData>(API_URL_product_Filter );
  }

  getFilteredProducts(data: { filters: any }): Observable<any> {
    return this.http.post<any>(API_URL_filterData, data);
  }
  

  

}
