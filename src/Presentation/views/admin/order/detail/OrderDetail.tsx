import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, Image, ToastAndroid } from 'react-native';
import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { AdminOrderStackParamList } from '../../../../navigator/AdminOrderStackNavigator';
import { OrderDetailItem } from './Item';
import { DateFormatter } from '../../../../utils/DateFormatter';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../components/RoundedButton';
import DropDownPicker from 'react-native-dropdown-picker';


interface Props extends StackScreenProps<AdminOrderStackParamList, 'AdminOrderDetailScreen'>{};
export const AdminOrderDetailScreen = ({navigation, route}: Props) => {

  const { invoice } = route.params;
  const { total, deliveryMen, responseMessage, open, value, items, getTotal, getDeliveryMen, setOpen, setValue, setItems, dispatchOrder } = useViewModel(invoice);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  

  useEffect(() => {
    if (total === 0.0) {
        getTotal();
    }
    getDeliveryMen();
  }, [])

  return (
    <View style={styles.container}>
        <View style={ styles.products }>

          <FlatList 
            data={ invoice.products }
            keyExtractor={ (item) => item._id! }
            renderItem={ ({item}) => <OrderDetailItem product={item}/> }
          />

        </View>
        <View style={ styles.info }>
          <View style={ {...styles.infoRow, marginTop: 25} }>
            
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Fecha del pedido</Text>
              <Text style={styles.infoDescription}>{DateFormatter(invoice.timestamp!)}</Text>
            </View>

            <Image 
              style={ styles.infoImage }
              source={require('../../../../../../assets/reloj.png')}
            />

          </View>

          <View style={ styles.infoRow }>
            
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Cliente y telefono</Text>
              <Text style={styles.infoDescription}>{invoice.client?.name} {invoice.client?.lastname} - {invoice.client?.phone}</Text>
            </View>

            <Image 
              style={ styles.infoImage }
              source={require('../../../../../../assets/user.png')}
            />

          </View>
         
          <View style={ styles.infoRow }>
            
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Direccion de entrega</Text>
              <Text style={styles.infoDescription}>{invoice.address?.address} - {invoice.address?.neighborhood}</Text>
            </View>

            <Image 
              style={ styles.infoImage }
              source={require('../../../../../../assets/location.png')}
            />

          </View>
          {
            invoice.status === 'PAGADO' 
            ? 
            <View>
              <Text style={styles.deliveries}>REPARTIDORES DISPONIBLES</Text>
              <View style={ styles.dropDown }>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </View>
            : <Text style={styles.deliveries}>REPARTIDOR ASIGNADO: {invoice.delivery?.name}</Text>
          }
          

          

          <View style={ styles.totalInfo }>
            <Text style={styles.total}>TOTAL: ${ total }</Text>
            <View style={styles.button}>
              {
                invoice.status === 'PAGADO' &&
                <RoundedButton text='DESPACHAR ORDEN' onPress={() => dispatchOrder()} />
              }
            </View>
          </View>
        </View>
    </View>
  )
}
