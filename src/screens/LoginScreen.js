import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login } from '../apicalls/auth';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("12345")

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
                        Toast.show(data.message)
                        dispatch({ type: "SET_USER_TOKEN", payload: data.token })
                        navigation.navigate("AddTodoScreen")
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
            <SafeAreaView style={styles.container}>
                <View style={{ padding: 20, backgroundColor: "yellow" }}>
                    <TextInput
                        placeholder="Enter email"
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1 }}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput
                        placeholder="Enter password"
                        secureTextEntry={true}
                        onChangeText={(pass) => setPassword(pass)}
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
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
            </SafeAreaView>
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
        justifyContent: "center"
    },
    btn: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: "blue",
        borderRadius: 50
    }
})
export default LoginScreen;