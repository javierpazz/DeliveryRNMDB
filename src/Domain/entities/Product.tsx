export interface Product {
    _id?: string;
    name: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    price: string;
    id_category: string | undefined;
    quantity?: number;
}