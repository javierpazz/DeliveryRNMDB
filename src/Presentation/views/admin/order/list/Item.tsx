import React from 'react'
import { Invoice } from '../../../../../Domain/entities/Order';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DateFormatter } from '../../../../utils/DateFormatter';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminOrderStackParamList } from '../../../../navigator/AdminOrderStackNavigator';


interface Props {
    invoice: Invoice,
    navigation: StackNavigationProp<AdminOrderStackParamList, 'AdminOrderListScreen', undefined>
}
export const OrderListItem = ({ invoice, navigation }: Props) => {
  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('AdminOrderDetailScreen', {invoice: invoice})}
    >
        <View style={ styles.container }>
            <Text style={ styles.order }>Orden #{invoice._id}</Text>
            <Text style={ {...styles.info, marginTop: 10} }>Fecha del pedido: { DateFormatter(invoice.timestamp!)}</Text>
            <Text style={ styles.info }>Cliente: {invoice.client?.name} {invoice.client?.lastname}</Text>
            <Text style={ styles.info }>Direccion: {invoice.address?.address}</Text>
            <Text style={ styles.info }>Barrio: {invoice.address?.neighborhood}</Text>
            <View  style={ styles.divider }></View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    order: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        marginTop: 10
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#e2e2e2',
        marginTop: 10
    },
    info: {
        fontSize: 13
    }
});