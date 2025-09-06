import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/globals/global-config';
import { BlogData, blog } from 'src/app/Models/home.model';


const API_URL_blogs = END_POINTS.blogs;



@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(){
    return this.http.get<BlogData>(API_URL_blogs);
  }

  getBlog(slug: string): Observable<blog>{
    return this.http.get<blog>(API_URL_blogs + `/${slug}`);
  }

}
