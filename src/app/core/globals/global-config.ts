import { environment } from 'src/environments/environment';

export const BaseURL = environment.apiUrl;

export const MusahmAPI_URL = BaseURL + environment.api_key;

export class END_POINTS {

  public static home = MusahmAPI_URL + 'home';
  public static settings = MusahmAPI_URL + 'get-main-settings';
  public static brands = MusahmAPI_URL + 'brands';
  public static brand = MusahmAPI_URL + 'cars/brand';
  public static locations = MusahmAPI_URL + 'locations';
  public static faqs = MusahmAPI_URL + 'faqs';
  public static categories = MusahmAPI_URL + 'categories';
  public static category = MusahmAPI_URL + 'cars/category';
  public static showlocation = MusahmAPI_URL + 'cars/location';
  public static footer = MusahmAPI_URL + 'get-footer';
  public static blogs = MusahmAPI_URL + 'blogs';
  public static search = MusahmAPI_URL + 'search';
  public static aboutus = MusahmAPI_URL + 'about-us';
  public static contactus = MusahmAPI_URL + 'contact-us';
  public static send_contact = MusahmAPI_URL + 'contact-us/send-message';
  public static product = MusahmAPI_URL + 'cars';
  public static filter = MusahmAPI_URL + 'advanced-search-setting';
  public static filterData = MusahmAPI_URL + 'advanced-search';
  public static seo = MusahmAPI_URL + 'seo-pages';
  public static currencies  = MusahmAPI_URL + 'currencies';



}
