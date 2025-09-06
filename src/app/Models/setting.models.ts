export interface Language {
    id: number;
    code: string;
    flag: string | null;
    name: string;
}

export interface Currency {
    id: number;
    code: string;
    name: string;
    symbol: string;
    exchange_rate: string;
    is_default: number;
}

export interface MainSetting {
    languages: Language[];
    currencies: Currency[];
    storage_base_url: string;
    dark_logo: string;
    light_logo: string;
}