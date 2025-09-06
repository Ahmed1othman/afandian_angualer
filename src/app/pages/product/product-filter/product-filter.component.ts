import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslationService } from 'src/app/core/services/Translation/translation.service';
import { FilterData } from 'src/app/Models/filterData.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  filterData: any;
  productFilterForm: FormGroup;
  activePanels: number[] = [];
  isArabic: boolean = false;
  minValue: number = 100;
  maxValue: number = 30000;
  activeIndex: number[] = [0, 1, 2, 3, 4];
  sliderOptions: Options = {
    floor: 0,                // Minimum possible value
    ceil: 30000,              // Maximum possible value
    translate: (value: number): string => {
      return `${value}`;
    }
  };
  translations: Record<string, string> = {};

  selectedCategories: number[] = [];
  selectedBrands: number[] = [];
  selectedColors: number[] = [];
  selectedTransmissions: number[] = [];
  productFilter?: FilterData;
  currentLang: string = 'en';
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private router: Router,
    private translationService: TranslationService,


  ) {
    this.productFilterForm = this.fb.group({
      brand_id: [[]],
      category_id: [[]],
      color_id: [[]],
      gear_type_id: [[]],
      luggage_capacity: [null],

      daily_main_price: [[100, 30000]],
      weekly_main_price: [[100, 30000]],
      monthly_main_price: [[100, 30000]],
      word: [''],
    });
  }


  applyPriceFilter() {
    const filterParams = {
      min_price: this.minValue,
      max_price: this.maxValue,
    };
  }


  ngOnInit() {
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
    this.currentLang = this.languageService.getCurrentLanguage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.languageService.getCurrentLanguage();
      }
    });
    // Assuming you have a dynamic panel count (e.g., from an array of data)
    const numberOfPanels = 5;
    this.activePanels = Array.from({ length: numberOfPanels }, (_, index) => index);
    
    // Check if we're on the all-cars route
    const isAllCarsRoute = this.router.url.includes('/all-cars');
    
    if (isAllCarsRoute) {
      // For "all cars" page, clear all filters to show all cars
      this.clearFilter();
    } else {
      // For the search page, apply filters based on query params
      this.route.queryParams.subscribe(params => {
        if (params['category']) {
          this.selectedCategories = [parseInt(params['category'], 10)];
        }
        if (params['brand']) {
          this.selectedBrands = [parseInt(params['brand'], 10)];
        }
        
        // Trigger the filter with the selected values
        this.submitFilter();
      });
    }

    this.getFilterData();
    // Don't submit filter here unconditionally as it would override clearFilter() for all-cars page
  }



  getFilterData() {
    this.productService.getProductFilter().subscribe((res: FilterData) => {
      this.productFilter = res;
    });
  }




  updateSelectedCategories(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
        if (!this.selectedCategories.includes(id)) {
            this.selectedCategories.push(id); // Only add if not already in the array
        }
    } else {
        this.selectedCategories = this.selectedCategories.filter(item => item !== id); // Remove if unchecked
    }
    this.submitFilter();
}

// Update functions for brands
updateSelectedBrands(id: number, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
      if (!this.selectedBrands.includes(id)) {
          this.selectedBrands.push(id); // Add brand ID if not already selected
      }
  } else {
      this.selectedBrands = this.selectedBrands.filter(item => item !== id); // Remove brand ID if unchecked
  }
  this.submitFilter();

}

// Update for Colors
updateSelectedColors(id: number, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
      if (!this.selectedColors.includes(id)) {
          this.selectedColors.push(id); // Add color ID if not already selected
      }
  } else {
      this.selectedColors = this.selectedColors.filter(item => item !== id); // Remove color ID if unchecked
  }
  this.submitFilter();

}

// Update for Transmissions
updateSelectedTransmissions(id: number, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
      if (!this.selectedTransmissions.includes(id)) {
          this.selectedTransmissions.push(id); // Add transmission ID if not already selected
      }
  } else {
      this.selectedTransmissions = this.selectedTransmissions.filter(item => item !== id); // Remove transmission ID if unchecked
  }
  this.submitFilter();
}


  onPriceChange() {
    this.submitFilter();
  }

  submitFilter() {
    const filters = {
      category_id: this.selectedCategories,
      brand_id: this.selectedBrands,
      color_id: this.selectedColors,
      gear_type_id: this.selectedTransmissions,
      daily_main_price: [this.minValue, this.maxValue],
    };

    this.productService.getFilteredProducts({ filters }).subscribe((res) => {
      this.filterData = res.data;
    });
  }

  clearFilter() {
    this.selectedCategories = [];
    this.selectedBrands = []; 
    this.selectedColors = []; 
    this.selectedTransmissions = []; 
    this.minValue = 100;
    this.maxValue = 30000;
    
    // Use an empty filters object to get all cars without any filtering
    const filters = {};
    
    this.productService.getFilteredProducts({ filters }).subscribe((res) => {
      this.filterData = res.data;
    });
  }
  

}
