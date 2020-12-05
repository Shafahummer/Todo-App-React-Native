import React, { useState } from 'react';
import { Text, Image, View, SafeAreaView, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login } from '../apicalls/auth';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const base_url = useSelector((state) => {
        return state.base_url;
    })

    const dispatch = useDispatch()

    const btnPressed = () => {
        if (email.trim() !== "" && password.trim() !== "") {
            login(base_url, email.toLowerCase().trim(), password.trim())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        Toast.show(data.error)
                    } else if (data.token) {
                        try {
                            AsyncStorage.setItem('token', data.token)
                        } catch (e) {
                            console.log("error");
                        }
                        Toast.show(data.message)
                        dispatch({ type: "SET_USER_TOKEN", payload: data.token })
                        if (data.user.todo_added == "1") {
                            try {
                                AsyncStorage.setItem('todo_added', "1")
                            } catch (e) {
                                console.log("error");
                            }
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeScreen' }]
                            })
                        } else {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'AddTodoScreen' }]
                            })
                        }
                    }
                    else {
                        Toast.show("Something wrong!Please try again...")
                    }
                })
                .catch(error => console.log(error))
        }
        else {
            Toast.show("All fields are mandatory!")
        }
    }

    return (
        <>
            <SafeAreaView style={styles.top} />
            <ImageBackground source={require('../images/bg.jpg')} style={styles.container}>
                <Image resizeMode="stretch" style={{ height: 250, width: "100%" }} source={{ uri: "https://images.pexels.com/photos/3773244/pexels-photo-3773244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }} />
                <View style={{ padding: 40 }}>
                    <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 18, color: "#FFFFFF" }}>Login here...</Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholder="Enter email"
                        style={{ height: 40, borderColor: "#c1c1c1", borderBottomWidth: 1 }}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor="#000"
                        secureTextEntry={true}
                        onChangeText={(pass) => setPassword(pass)}
                        style={{ height: 40, borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            btnPressed()
                            //navigation.navigate("HomeScreen")
                        }}>
                            <Text style={{ color: "#FFFFFF" }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")}>
                            <Text style={{ color: "#000000" }}>New User? Register here...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}
const styles = StyleSheet.create({
    top: {
        flex: 0,
        backgroundColor: "#FFFFFF"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    btn: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: "blue",
        borderRadius: 50
    }
})
export default LoginScreen;