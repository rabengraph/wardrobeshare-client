export interface Image {
    id: number;
    url: string;
    previewUrl: string;
}

export interface Clothing {
    id: number;
    name: string;
    image: Image;
    size: string;
    bust?: number;
    waist?: number;
    hips?: number;
    description: string;
    price: number;
    person?: User;
    color: Color[];
    manufacturer: Manufacturer;
}

export interface Location {
    id: number;
    city: string;
    country: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: Image;
    clothings: Clothing[];
    location: Location;
    slogan: string;
}

export interface Manufacturer {
    id: number;
    name: string;
}

export interface Color {
    id: number;
    name: string;
    hex: string;
}
