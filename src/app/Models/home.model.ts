export interface HomeResponse {
    data: Data;
    status: string;
  }
  
  export interface Data {
    header_section: HeaderSection;
    only_on_afandina_section: AfandinaSection;
    special_offers_section: SpecialOffersSection;
    why_choose_us_section: WhyChooseUsSection;
    document_section: DocumentSection;
    short_videos_section: InstagramSection;
    advertisements:Advertisements;
    where_find_us:any;
  }
  export interface Advertisements {
    advertisements: advertisements_data[];
  }
  export interface advertisements_data {
    id: number;
    slug: string;
    title: string;
    description: string;
    mobile_image: string;
    web_image: string;
    position_key: string;
  }
  export interface SearchTab {
    languages: Language[];
    currencies: any[];
  }
  
  export interface Language {
    id: number;
    code: string;
    flag: string | null;
    name: string;
  }
  
  export interface HeaderSection {
    hero_header_title: string | null;
    hero_header_video_path: any;
    social_media_links: SocialMediaLinks;
    hero_media_type:string;
    hero_header_image_path:string;
    menu_keys: any[]; 
  }
  
  export interface SocialMediaLinks {
    facebook: string;
    twitter: string;
    instagram: string;
    snapchat: string;
  }
  
  export interface BrandsSection {
    section_title: string | null;
    section_description: string | null;
    brands: Brand[];
  }
  
  export interface Brand {
    id: number;
    image: string;
    slug: string;
    name: string;
    section_title: string | null;
    description: string;
    car_count:string;
  }
  
  export interface CategoriesSection {
    section_title: string | null;
    section_description: string | null;
    categories: Category[];
  }
  
  export interface Category {
    id: number;
    image: string | null;
    slug: string;
    name: string;
    section_title: string | null;
    description: string;
    car_count : string;
  }
  
  export interface AfandinaSection {
    car_only_section_title: string | null;
    car_only_section_paragraph: string | null;
    only_on_afandina: any[]; // Assuming the array is empty
  }
  
  export interface SpecialOffersSection {
    special_offers_title: string | null;
    special_offers_section_paragraph: string | null;
    special_offers: any[]; // Assuming the array is empty
  }
  
  export interface WhyChooseUsSection {
    why_choose_us_title: string | null;
    why_choose_us_section_paragraph: string | null;
    services: any[]; // Assuming services array is empty
  }
  

  
  export interface FaqsSection {
    section_title: string | null;
    section_description: string | null;
    faqs: any[]; // Assuming faqs array is empty
  }
  
  export interface LocationSection {
    location_title: string | null;
    location_paragraph: string | null;
    locations: any[]; // Assuming locations array is empty
  }
  
  export interface DocumentSection {
    document_title: string | null;
    document_section_paragraph: string | null;
    documents: any[]; // Assuming documents array is empty
  }
  
  export interface InstagramSection {
    short_videos_title: string;
    short_videos: any[];
  }
  
  export interface FooterSection {
    footer_section_paragraph: string | null;
    social_media: SocialMedia;
    contact_data: ContactData;
    address_data: AddressData;
  }
  
  export interface SocialMedia {
    whatsapp: string;
    facebook: string;
    twitter: string;
    instagram: string;
    snapchat: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  }
  
  export interface ContactData {
    phone: string;
    email: string;
    alternative_phone: string;
  }
  
  export interface AddressData {
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }
  
  export interface BlogData {
    section_title: string | null;
    section_description: string | null;
    blogs: blog[];
  }

  export interface blog {
    data: {
      id: number;
      image: string | null;
      created_at: string;
      title: string;
      description: string;
      content:string;
      related_cars:any[];
      related_blogs:any[];
      schemas:any;
      seo_data:any;
    }
  }