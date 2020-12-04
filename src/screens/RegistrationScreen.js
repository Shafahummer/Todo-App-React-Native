import React from 'react';
import { Image, ImageBackground, Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RegistrationScreen = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.top} />
            <ImageBackground source={require('../images/bg.jpg')} style={styles.container}>
                <Image resizeMode="stretch" style={{ height: 250, width: "100%" }} source={{ uri: "https://images.pexels.com/photos/3773244/pexels-photo-3773244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }} />
                <View style={{ padding: 40 }}>
                    <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 18, color: "#FFFFFF" }}>Register here...</Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholder="Enter username"
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1 }}
                    />
                    <TextInput
                        placeholderTextColor="#000"
                        placeholder="Enter email"
                        style={{ height: 40, borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <TextInput
                        placeholderTextColor="#000"
                        placeholder="Enter password"
                        secureTextEntry={true}
                        style={{ height: 40, borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={styles.btn}>
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