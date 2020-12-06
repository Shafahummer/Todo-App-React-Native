import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const AdminPanel = () => {

    const [education, setEducation] = useState("")
    const [todo, setTodo] = useState("")

    const base_url = useSelector((state) => {
        return state.base_url
    })

    const user_token = useSelector((state) => {
        return state.user_token
    })

    const saveEducation = () => {
        if (education.trim() === "") {
            Toast.showWithGravity("Please enter education...", Toast.LONG, Toast.CENTER)
        }
        else {
            axios.post(`${base_url}/admin/add_education`, {
                education: education.trim()
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + user_token
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.error) {
                        Toast.showWithGravity(response.data.error, Toast.LONG, Toast.CENTER)
                    }
                    else {
                        setEducation("")
                        Toast.showWithGravity(response.data.message, Toast.LONG, Toast.CENTER)
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    Toast.show(error.toString())
                })
        }
    }

    const saveTodo = () => {
        if (todo.trim() === "") {
            Toast.showWithGravity("Please enter todo...", Toast.LONG, Toast.CENTER)
        }
        else {
            axios.post(`${base_url}/admin/add_todo`, {
                todo: todo.trim()
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + user_token
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.error) {
                        Toast.showWithGravity(response.data.error, Toast.LONG, Toast.CENTER)
                    }
                    else {
                        setTodo("")
                        Toast.showWithGravity(response.data.message, Toast.LONG, Toast.CENTER)
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    Toast.show(error.toString())
                })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                    <TextInput
                        value={education}
                        onChangeText={(text) => {
                            setEducation(text)
                        }}
                        placeholder="Enter education"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        saveEducation()
                    }}>
                        <Text style={{ color: "#FFFFFF" }}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        value={todo}
                        onChangeText={(text) => {
                            setTodo(text)
                        }}
                        placeholder="Enter todo"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        saveTodo()
                    }}>
                        <Text style={{ color: "#FFFFFF" }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    input: {
        height: 40,
        borderColor: "#c1c1c1",
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10,
        flex: 4
    },
    btn: {
        backgroundColor: "#019031",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        paddingHorizontal: 25,
        flex: 1,
        marginLeft: 10
    }
})

export default AdminPanel;