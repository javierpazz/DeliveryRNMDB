import { User } from "./User";
import { Address } from './Address';
import { Product } from './Product';

export interface Invoice {
    _id?: string;
    id_client?: string;
    id_delivery?: string;
    id_address?: string;
    status?: string;
    lat?: number;
    lng?: number;
    timestamp?: number;
    client?: User,
    delivery?: User,
    address?: Address,
    products: Product[]
    shippingAddress?: {
        fullName: string,
        address: string,
        city: string,
        postalCode: number,
        country: string,
        location: {
          lat: number,
          lng: number,
          address: string,
          name: string,
          vicinity: string,
          googleAddressId: string,
        },
      },
      itemsPrice?: number,
      shippingPrice?: number,
      taxPrice?: number,
      totalPrice?: number,
      ordYes?: string,
      staOrd?: string,
}





