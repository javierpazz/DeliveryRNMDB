import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Invoice } from '../entities/Order';
export interface OrderRepository {

    create(invoice: Invoice): Promise<ResponseApiDelivery>;
    getByStatus(status: string): Promise<Invoice[]>;
    getByDeliveryAndStatus(idDelivery: string, status: string): Promise<Invoice[]>;
    getByClientAndStatus(idClient: string, status: string): Promise<Invoice[]>;
    updateToDispatched(invoice: Invoice): Promise<ResponseApiDelivery>;
    updateToOnTheWay(invoice: Invoice): Promise<ResponseApiDelivery>;
    updateToDelivered(invoice: Invoice): Promise<ResponseApiDelivery>;

}