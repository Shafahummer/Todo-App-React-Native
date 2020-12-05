import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Buffer } from 'buffer/';
import { getTodoDetails } from '../apicalls/getTodoDetails';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {

    const profileImg = useSelector((state) => {
        return state.profile_img;
    })
    console.log("HOME SCREEN :", profileImg);

    const [apiData, setApiData] = useState(null)

    const base_url = useSelector((state) => {
        return state.base_url
    })

    const user_token = useSelector((state) => {
        return state.user_token
    })

    const dispatch = useDispatch()


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTodos()
            getUser()
        });
        return unsubscribe;
    }, [navigation]);



    const getTodos = () => {
        getTodoDetails(base_url, user_token)
            .then(data => {
                if (data.error) {
                    Toast.show(data.error)
                }
                else {
                    setApiData(data)
                }
            })
            .catch(error => console.log(error))
    }

    const getUser = () => {
        axios.get(`${base_url}/user`,
            {
                headers: {
                    Authorization: 'Bearer ' + user_token
                }
            })
            .then(function (response) {
                if (response.data.error) {
                    Toast.show(response.data.error)
                } else {
                    dispatch({ type: "SET_PROFILE_IMG", payload: response.data.user.profile })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    const deleteTodo = async (id) => {
        await axios({
            url: `${base_url}/delete_todo`,
            method: "delete",
            data: {
                todo_id: id
            },
            headers: { "Authorization": 'Bearer ' + user_token }
        }).then(response => {
            console.log(response.data);
            if (response.data.error) {
                Toast.show(response.data.error)
            } else {
                Toast.show("Todo deleted successfully...")
                getTodos()
            }
        }).catch(error => {
            console.log("Error--->", error);
            Toast.show(error.toString())
        })


    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={{ alignSelf: "baseline", padding: 15, position: "absolute", right: 0 }} onPress={() => {
                    deleteTodo(item._id)
                }}>
                    <Image source={{ uri: "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" }} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                {item.photo ?
                    <Image
                        style={{ height: 100, width: 100, marginBottom: 10 }}
                        source={{
                            uri: arrayBufferToBase64(item.photo.data)
                        }}
                    />
                    :
                    <Image
                        style={{ height: 100, width: 100, marginBottom: 10 }}
                        source={{ uri: "https://ultravires.ca/wp/wp-content/uploads/2018/03/Then-and-Now_-no-image-found.jpg" }}
                    />
                }
                <Text style={{ marginBottom: 10 }}>Todo Title : {item.title}</Text>
                <Text style={{ marginBottom: 10 }}>Education: {item.education.education}</Text>
                <Text style={{ marginBottom: 10 }}>Todo Date: {item.todo_date.split("T")[0]}</Text>
                <FlatList
                    data={item.todos}
                    renderItem={({ item }) => (
                        <Text style={{ marginBottom: 10 }}>What to do: {item.todo}</Text>
                    )}
                    listKey={item => item._id}
                />

            </View>
        )
    };

    const arrayBufferToBase64 = buffer => {
        const b64 = new Buffer(buffer).toString('base64')
        let ed = `data:image/png;base64,${b64}`
        return ed;
    };

    return (
        <>
            <SafeAreaView style={styles.top} />
            <SafeAreaView style={styles.container} >
                {apiData ?
                    <FlatList
                        data={apiData.todo}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    :
                    <View style={{ justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#75DA8B" />
                    </View>
                }
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
        backgroundColor: "#FFFFFF"
    },
    itemContainer: {
        alignItems: "center",
        padding: 20,
        borderColor: "red",
        borderWidth: 1,
        marginBottom: 20,
        margin: 20,
        backgroundColor: "#F3F3F3"
    }
})

export default HomeScreen;

