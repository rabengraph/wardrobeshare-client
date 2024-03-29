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
    colors: Color[];
    manufacturer: Manufacturer;
    eventsWorn: Event[];
    cultures: Culture[];
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
    rating: number;
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

export interface Occasion {
    id: number;
    name: string;
}
export interface Culture {
    id: number;
    name: string;
}

export interface Event {
    id: number;
    date: string;
    occasion: Occasion;
    person: User;
}
