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
}

export interface Location {
    id: number;
    name: string;
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
