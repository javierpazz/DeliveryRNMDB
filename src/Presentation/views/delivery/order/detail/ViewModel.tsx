import React, { useState, useEffect, useContext } from 'react'
import { Invoice } from '../../../../../Domain/entities/Order';
import { GetDeliveryMenUserUseCase } from '../../../../../Domain/useCases/user/GetDeliveryMenUser';
import { User } from '../../../../../Domain/entities/User';
import { UpdateToDispatchedOrderUseCase } from '../../../../../Domain/useCases/order/UpdateToDispatchedOrder';
import { OrderContext } from '../../../../context/OrderContext';


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
    const { updateToOnTheWay, getOrdersByStatus } = useContext(OrderContext);

    const updateToOnTheWayOrder = async () => {
        const result = await updateToOnTheWay(invoice);
        setResponseMessage(result.message);
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
        setOpen,
        setValue,
        setItems,
        updateToOnTheWayOrder
    }
}


export default AdminOrderDetailViewModel;