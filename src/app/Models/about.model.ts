export interface AboutUsResponse {
  data: AboutUsData;
  status: string;
}

export interface AboutUsData {
  about_us_data: AboutUsDetails;
  seo_data: SeoData;
}

export interface AboutUsDetails {
  our_mission_image_path: string;
  why_choose_image_path: string;
  about_main_header_title: string;
  about_main_header_paragraph: string;
  about_our_agency_title: string;
  why_choose_title: string;
  our_vision_title: string;
  our_mission_title: string;
  why_choose_content: string;
  our_vision_content: string;
  our_mission_content: string;
}

export interface SeoData {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}
