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
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';


interface Props extends StackScreenProps<ClientOrderStackParamList, 'ClientOrderDetailScreen'>{};
export const ClientOrderDetailScreen = ({navigation, route}: Props) => {

  const { invoice } = route.params;
  const { total, deliveryMen, responseMessage, open, value, items, getTotal, setOpen, setValue, setItems, updateToOnTheWayOrder } = useViewModel(invoice);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  

  useEffect(() => {
    if (total === 0.0) {
        getTotal();
    }
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
         
          <View style={ styles.infoRow }>
          
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>REPARTIDOR ASIGNADO</Text>
              <Text style={styles.infoDescription}>{invoice.delivery?.name} {invoice.delivery?.lastname}</Text>
            </View>

            <Image 
              style={ styles.infoImage }
              source={require('../../../../../../assets/my_user.png')}
            />

          </View>
          
          <View style={ styles.totalInfo }>
            <Text style={styles.total}>TOTAL: ${ total }</Text>
            <View style={styles.button}>
              {
                invoice.status === 'EN CAMINO' &&
                <RoundedButton text='RASTREAR PEDIDO' onPress={() => navigation.navigate('ClientOrderMapScreen', {invoice: invoice})} />
              }
            </View>
          </View>
        </View>
    </View>
  )
}
