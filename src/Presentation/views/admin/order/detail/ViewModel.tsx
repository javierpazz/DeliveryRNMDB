import React, { useState, useEffect, useContext } from 'react'
import { Invoice } from '../../../../../Domain/entities/Order';
import { GetDeliveryMenUserUseCase } from '../../../../../Domain/useCases/user/GetDeliveryMenUser';
import { User } from '../../../../../Domain/entities/User';
import { UpdateToDispatchedOrderUseCase } from '../../../../../Domain/useCases/order/UpdateToDispatchedOrder';
import { OrderContext } from '../../../../context/OrderContext';
import { NotificationPush } from '../../../../utils/NotificationPush';


interface DropDownProps {
    label: string, 
    value: string
}
const AdminOrderDetailViewModel = (invoice: Invoice) => {
    
    const [total, setTotal] = useState(0.0);
    const [deliveryMen, setDeliveryMen] = useState<User[]>([]);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropDownProps[]>([]);
    
    const { updateToDispatched, getOrdersByStatus } = useContext(OrderContext);
    const { sendPushNotification } = NotificationPush();

    useEffect(() => {
        setDropDownItems();
    }, [deliveryMen])
    

    const dispatchOrder = async () => {
        if (value !== null) {
            invoice.id_delivery = value!;
            const result = await updateToDispatched(invoice);
            setResponseMessage(result.message);
            if (result.success) {
                const index = deliveryMen.findIndex((delivery) => delivery._id === value!);
                console.log('TOKEN DE NOTIFICATION: ' + deliveryMen[index].notification_token);
                
                await sendPushNotification(deliveryMen[index].notification_token!, 'PEDIDO ASIGNADO', 'Te han asignado un pedido');
            }
        }
        else {
            setResponseMessage('Selecciona el repartidor');
        }
        console.log('REPARTIDOR SELECCIONADO: ' + value);
    }

    const setDropDownItems = () => {
        let itemsDeliveryMen: DropDownProps[] = [];
        deliveryMen.forEach(delivery => {
            itemsDeliveryMen.push({
                label: delivery.name + ' ' + delivery.lastname,
                value: delivery._id!
            })
        });
        setItems(itemsDeliveryMen);
    }
    
    const getDeliveryMen = async () => {
        const result = await GetDeliveryMenUserUseCase();
        console.log('REPARTIDORES: ' + JSON.stringify(result, null, 3));
        setDeliveryMen(result);
    } 

    const getTotal = () => {
        invoice.products.forEach(p => {
            setTotal(total + (p.price * p.quantity!));
        });
    }
  
    return {
        total,
        deliveryMen,
        open,
        value,
        items,
        responseMessage,
        getTotal,
        getDeliveryMen,
        setOpen,
        setValue,
        setItems,
        dispatchOrder
    }
}


export default AdminOrderDetailViewModel;