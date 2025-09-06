// footer.model.ts

export interface FooterData {
    data: {
        footer_section_paragraph: string | null;
        social_media: SocialMedia;
        contact_data: ContactData;
        address_data: AddressData;
    };
    status: string;
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
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}
