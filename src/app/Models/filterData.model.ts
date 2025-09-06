// filter-data.model.ts

export interface Brand {
    id: number;
    slug: string;
    name: string;
    description?: string | null;
    image: string;
    car_count: number;
}

export interface Category {
    id: number;
    slug: string;
    name: string;
    description: string;
    image: string;
    car_count: number;
}

export interface GearType {
    id: number;
    slug: string;
    name: string;
    car_count: number;
}

export interface Color {
    id: number;
    slug: string;
    name: string;
    car_count: number;
    color_code:string;
}

export interface FilterData {
    data:Data;
}

export interface Data {
    brands: Brand[];
    categories: Category[];
    gear_types: GearType[];
    colors: Color[];
}