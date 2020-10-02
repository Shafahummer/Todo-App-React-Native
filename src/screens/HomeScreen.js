import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Buffer } from 'buffer/';
import { getTodoDetails } from '../apicalls/getTodoDetails';
import Toast from 'react-native-simple-toast';


const HomeScreen = () => {

    const [apiData, setApiData] = useState(null)

    const base_url = useSelector((state) => {
        return state.base_url
    })

    const user_token = useSelector((state) => {
        return state.user_token
    })

    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = () => {
        getTodoDetails(base_url, user_token)
            .then(data => {
                console.log(data)
                if (data.error) {
                    Toast.show(data.error)
                }
                else {
                    setApiData(data)
                }
            })
            .catch(error => console.log(error))
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
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
                        source={require('../images/profile-photo.jpeg')}
                    />
                }
                <Text style={{ marginBottom: 10 }}>Todo Title : {item.title}</Text>
                <Text style={{ marginBottom: 10 }}>Education: {item.education.education}</Text>
                <Text style={{ marginBottom: 10 }}>Todo Date: {item.todo_date.split("T")[0]}</Text>
                {item.todos.map((value, index) => (
                    <Text style={{ marginBottom: 10 }}>What to do: {value.todo}</Text>
                ))}
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
                {apiData !== null &&
                    <FlatList
                        data={apiData.todo}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
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

