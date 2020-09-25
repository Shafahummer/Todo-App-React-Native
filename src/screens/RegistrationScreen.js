import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RegistrationScreen = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.top} />
            <SafeAreaView style={styles.container}>
                <View style={{ padding: 20, backgroundColor: "yellow" }}>
                    <TextInput
                        placeholder="Enter username"
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1 }}
                    />
                    <TextInput
                        placeholder="Enter email"
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
                    />
                    <TextInput
                        placeholder="Enter password"
                        secureTextEntry={true}
                        style={{ borderBottomColor: "#c1c1c1", borderBottomWidth: 1, marginTop: 25 }}
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
export default RegistrationScreen;