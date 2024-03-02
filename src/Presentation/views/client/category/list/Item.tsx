import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Category } from '../../../../../Domain/entities/Category';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { MyColors } from '../../../../theme/AppTheme';

interface Props {
    category: Category,
    height: number,
    width: number,
    navigation: StackNavigationProp<ClientStackParamList, "ClientCategoryListScreen", undefined>
}

export const ClientCategoryItem = ({category, height, width, navigation}: Props) => {
  return (
    <TouchableOpacity
        onPress={ () => {
            navigation.navigate('ClientProductListScreen', { idCategory: category._id! })
        }}>
        <View style={ styles.container }>
            <Image
                style={ styles.image }
                source={{ uri: category.image }}
            />

            <View style={styles.info}>
                <Text style={styles.title}>{ category.name }</Text>
                <Text style={styles.description}>{ category.description }</Text>
            </View>

            <View style={ styles.actionContainer }>
            </View>

        </View>
        <View style={styles.divider}></View>
        
    </TouchableOpacity>
  )
}

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            height: 70,
            marginHorizontal: 20,
            marginTop: 10
        },
        imageContainer: {
            flex: 1,
            borderRadius: 18,
            backgroundColor: 'white',
        },
        image: {
            width: 60,
            height: 60,
            borderRadius: 15
        },
        info: {
            marginLeft: 15,
            flex: 1
        },
        titleContainer: {
            color: 'black',
            fontSize: 15
        },
        title: {
            color: 'black',
            fontSize: 15
        },
        description: {
            color: 'gray',
            fontSize: 12,
            marginTop: 3
        },
        actionContainer: {
            marginRight: 40
        },
        actionImage: {
            width: 25,
            height: 25,
            marginVertical:2
        },
        divider: {
            height: 1,
            backgroundColor: '#f2f2f2',
            marginHorizontal: 30,
            flex: 1
        }
    });