import { Invoice } from '../../Domain/entities/Order';
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Children, createContext, useState, useEffect } from 'react';
import { GetByStatusOrderUseCase } from '../../Domain/useCases/order/GetByStatusOrder';
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCases/order/UpdateToDispatchedOrder';
import { GetByDeliveryAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByDeliveryAndStatusOrder';
import { UpdateToOnTheWayOrderUseCase } from '../../Domain/useCases/order/UpdateToOnTheWayOrder';
import { UpdateToDeliveredOrderUseCase } from '../../Domain/useCases/order/UpdateToDeliveredOrder';
import { GetByClientAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByClientAndStatusOrder';

export interface OrderContextProps {
    ordersPayed: Invoice[],
    ordersDispatched: Invoice[],
    ordersOnTheWay: Invoice[],
    ordersDelivery: Invoice[],
    getOrdersByStatus(status: string): Promise<void>,
    getOrdersByDeliveryAndStatus(idDelivery: string, status: string): Promise<void>,
    getOrdersByClientAndStatus(idClient: string, status: string): Promise<void>,
    updateToDispatched(invoice: Invoice): Promise<ResponseApiDelivery>,
    updateToOnTheWay(invoice: Invoice): Promise<ResponseApiDelivery>,
    updateToDelivered(invoice: Invoice): Promise<ResponseApiDelivery>,
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({children}: any) => {

    const [ordersPayed, setOrdersPayed] = useState<Invoice[]>([]);
    const [ordersDispatched, setOrdersDispatched] = useState<Invoice[]>([]);
    const [ordersOnTheWay, setOrdersOnTheWay] = useState<Invoice[]>([]);
    const [ordersDelivery, setOrdersDelivery] = useState<Invoice[]>([]);

    useEffect(() => {
        setOrdersPayed([]);
        setOrdersDispatched([]);
        setOrdersOnTheWay([]);
        setOrdersDelivery([]);
    }, [])
    

    const getOrdersByStatus = async (status: string) => {
        const result = await GetByStatusOrderUseCase(status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersDelivery(result);
        }
    }
    
    const getOrdersByDeliveryAndStatus = async (idDelivery: string, status: string) => {
        const result = await GetByDeliveryAndStatusOrderUseCase(idDelivery, status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersDelivery(result);
        }
    }
    
    
    const getOrdersByClientAndStatus = async (idClient: string, status: string) => {
        const result = await GetByClientAndStatusOrderUseCase(idClient, status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersDelivery(result);
        }
    }

    const updateToDispatched = async (invoice: Invoice) => {
        const result = await UpdateToDispatchedOrderUseCase(invoice);
        getOrdersByStatus('PAGADO');
        getOrdersByStatus('DESPACHADO');
        return result;
    }
    
    const updateToOnTheWay = async (invoice: Invoice) => {
        const result = await UpdateToOnTheWayOrderUseCase(invoice);
        getOrdersByDeliveryAndStatus(invoice.id_delivery!,  'DESPACHADO');
        getOrdersByDeliveryAndStatus(invoice.id_delivery!, 'EN CAMINO');
        return result;
    }
    
    const updateToDelivered = async (invoice: Invoice) => {
        const result = await UpdateToDeliveredOrderUseCase(invoice);
        getOrdersByDeliveryAndStatus(invoice.id_delivery!, 'EN CAMINO');
        getOrdersByDeliveryAndStatus(invoice.id_delivery!,  'ENTREGADO');
        return result;
    }

    return (
        <OrderContext.Provider
            value={{
                ordersPayed,
                ordersDispatched,
                ordersOnTheWay,
                ordersDelivery,
                getOrdersByStatus,
                getOrdersByDeliveryAndStatus,
                getOrdersByClientAndStatus,
                updateToDispatched,
                updateToOnTheWay,
                updateToDelivered
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}