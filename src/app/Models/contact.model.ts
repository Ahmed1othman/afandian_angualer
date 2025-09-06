// contact-us.model.ts
export interface ContactUsResponse {
  data: ContactUs;
  status: string;
}
export interface ContactUs { 
  contact_us_title: string;
  contact_us_paragraph: string;
  contact_us_detail_title: string;
  contact_us_detail_paragraph: string;
  faq_section_title: string;
  faq_section_paragraph: string;
  faqs: FAQ[];
  website?: string | null;
  google_map_url: string;
  additional_info: string;
  contact_data: ContactData;
}


export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  alternative_phone: string;
  address: Address;
  social_media_links: SocialMediaLinks;
}

export interface Address {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
  tiktok?: string;
  snapchat?: string;
}
