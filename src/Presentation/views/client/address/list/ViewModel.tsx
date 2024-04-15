import React, { useState, useContext, useEffect } from 'react'
import { GetByUserAddressUseCase } from '../../../../../Domain/useCases/address/GetByUserAddress';
import { Address } from '../../../../../Domain/entities/Address';
import { UserContext } from '../../../../context/UserContext';
import { CreateOrderUseCase } from '../../../../../Domain/useCases/order/CreateOrder';
import { Invoice } from '../../../../../Domain/entities/Order';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';

const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>([]);
    const { user, saveUserSession, getUserSession } = useContext(UserContext);
    const { total, shoppingBag } = useContext( ShoppingBagContext );
    const [checked, setChecked] = useState('');
    const [responseMessage, setResponseMessage] = useState('');


    useEffect(() => {
        getAddress();
        if (user.address !== null && user.address !== undefined) {
            changeRadioValue(user.address!);
            console.log('USUARIO CON DIRECCION: ' + JSON.stringify(user));
            console.log('US: ' + user.address + user.address.lat + user.address.lng);
            
        }
    }, [user])
    

    const createOrder = async () => {
        const invoice: Invoice = {
            id_client: user._id!,
            id_address: user.address?._id!,
            products: shoppingBag,
            totalPrice: total,
            itemsPrice: total,
            // lng: user.address?.lng,
            // lat: user.address?.lat,
           // shippingAddress.location.lat: user.address?.lat,
           // shippingAddress.fullName: user.address?.name!,
        }
        const result = await CreateOrderUseCase(invoice);
        setResponseMessage(result.message);
    }

    const changeRadioValue = async (address: Address) => {
        setChecked(address._id!);
        user.address = address;
        saveUserSession(user);
    } 

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user._id!);
        setAddress(result);
    }

    return {
        address,
        checked,
        responseMessage,
        getAddress,
        changeRadioValue,
        createOrder
    }
}

export default ClientAddressListViewModel;
