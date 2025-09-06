import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { BlogData } from 'src/app/Models/home.model';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  blogs!: BlogData;
  currentLang: string = 'en';
  constructor(private homeService: HomeService,    private languageService: LanguageService,
    private router: Router,

  ){}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    this.getBlogs();
  }

  getBlogs(){
    this.homeService.getBlogs().subscribe((res: BlogData) => {
      this.blogs = res;
    });
  }
  
}
