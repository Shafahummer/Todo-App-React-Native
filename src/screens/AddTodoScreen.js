import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddTodoScreen = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.top} />
            <SafeAreaView style={styles.container}>
                <View style={{ padding: 20 }}>

                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={{ color: "#FFFFFF" }}>Add Todo</Text>
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
export default AddTodoScreen;