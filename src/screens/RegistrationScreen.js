import React, { useState } from 'react';
import { Image, ImageBackground, Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Axios from 'axios';

const RegistrationScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const base_url = useSelector((state) => {
        return state.base_url
    })

    const registerUser = () => {
        if (name.trim() === "" || email.trim() === "" || password1.trim() === "" || password2.trim() === "") {
            Toast.show("All fields are mandatory...")
        } else if (name.trim().length < 3) {
            Toast.show("Enter a valid name...")
        } else if (email.trim().length < 5) {
            Toast.show("Enter a valid email...")
        } else if (password1.trim().length < 5) {
            Toast.show("Password should be atleast 5 characters...")
        } else if (password1.trim() != password2.trim()) {
            Toast.show("Password mismatch...")
        } else {
            Axios.post(`${base_url}/signup`, {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password: password1.trim()
            }).then(response => {
                console.log(response.data);
                if (response.data.error) {
                    Toast.show(response.data.error)
                } else {
                    Toast.show(response.data.message)
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'LoginScreen' }]
                        })
                    }, 2000)
                }
            })
        }
    }

    return (
        <>
            <SafeAreaView style={styles.top} />
            <ImageBackground source={require('../images/bg.jpg')} style={styles.container}>
                <Image resizeMode="stretch" style={{ height: 250, width: "100%" }} source={{ uri: "https://images.pexels.com/photos/3773244/pexels-photo-3773244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }} />
                <View style={{ padding: 40 }}>
                    <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 18, color: "#FFFFFF" }}>Register here...</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => {
                            setName(text)
                        }}
                        placeholderTextColor="#000"
                        placeholder="Enter username"
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1 }}
                    />
                    <TextInput
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                        placeholderTextColor="#000"
                        placeholder="Enter email"
                        style={{ height: 40, borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <TextInput
                        value={password1}
                        onChangeText={(text) => {
                            setPassword1(text)
                        }}
                        placeholderTextColor="#000"
                        placeholder="Enter password"
                        secureTextEntry={true}
                        style={{ height: 40, borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <TextInput
                        value={password2}
                        onChangeText={(text) => {
                            setPassword2(text)
                        }}
                        placeholderTextColor="#000"
                        placeholder="Confirm password"
                        secureTextEntry={true}
                        style={{ height: 40, borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            registerUser()
                        }}>
                            <Text style={{ color: "#FFFFFF" }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style={{ color: "#000000" }}>Already a User? Login here...</Text>
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
export default RegistrationScreen;