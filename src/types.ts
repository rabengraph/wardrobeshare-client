export interface Image {
    id: number;
    url: string;
    previewUrl: string;
}

export interface Clothing {
    id: number;
    name: string;
    image: Image;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: Image;
    clothings: Clothing[];
}
