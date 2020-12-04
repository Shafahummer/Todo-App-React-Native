import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        getData()
    }, [])

    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            const todo_added = await AsyncStorage.getItem('todo_added')
            if (value !== null) {
                console.log(value);
                dispatch({ type: "SET_USER_TOKEN", payload: value })
                if (todo_added) {
                    setTimeout(() => {
                        navigation.replace("HomeScreen")
                    }, 2000)
                } else {
                    setTimeout(() => {
                        navigation.replace("AddTodoScreen")
                    }, 2000)
                }

            }
            else {
                setTimeout(() => {
                    navigation.replace("LoginScreen")
                }, 2000)
            }
        } catch (e) {
            Toast.show("Something wrong...")

        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
            <Image source={{ uri: "https://img.freepik.com/free-icon/link-informatic_318-10808.jpg" }} style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2 }} />
        </View>
    )
}
export default SplashScreen;