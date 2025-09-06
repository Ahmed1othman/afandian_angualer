// product.model.ts
export interface ProductResource {
    data:Product,
}

export interface Product {
    daily_main_price: number;
    daily_discount_price: number;
    weekly_main_price: number;
    weekly_discount_price: number;
    monthly_main_price: number;
    monthly_discount_price: number;
    id: number;
    door_count: number;
    luggage_capacity: number;
    passenger_capacity: number;
    insurance_included: string;
    free_delivery: string;
    is_featured: number;
    is_flash_sale: number;
    status: string;
    gear_type: string;
    color: Color;
    brand: string;
    car_model: string | null;
    category: string;
    category_slug: string;
    brand_slug: string;
    default_image_path: string;
    slug: string;
    name: string;
    images: Media[];
    related_cars: RelatedCar[];
    seo_data: SeoData;
    long_description:string;
    year:number;
    car_features:any;
    description:string;
  }
  
  export interface Color {
    name: string;
    code: string;
  }
  
  export interface Media {
    file_path: string;
    alt: string;
    type: 'image' | 'video';
  }
  
  export interface RelatedCar extends Omit<Product, 'related_cars' | 'seo_data'> {
    no_deposit: number;
    discount_rate: number;
  }
  
  export interface SeoData {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  }
  