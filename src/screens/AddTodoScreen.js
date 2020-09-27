import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';


const AddTodoScreen = ({ navigation }) => {

    const [title, setTitle] = useState("")
    const [education, setEducation] = useState(null)
    const [todos, setTodos] = useState(null)
    const [date, setDate] = useState(new Date())
    const [photo, setPhoto] = useState(null)
    const [avatarSource, setAvatarSource] = useState("")

    const items1 = [
        { label: 'BCA', value: '5f6f8a361247e20d28d4c28f' },
        { label: 'MCA', value: '5f6f8a431247e20d28d4c290' },
        { label: 'BCA', value: '5f6f8a361247e20d28d4c28f1' },
        { label: 'MCA', value: '5f6f8a431247e20d28d4c290s' },
        { label: 'BCA', value: '5f6f8a361247e20d28d4c2d8f' },
        { label: 'MCA', value: '5f6f8a431247e20d28d4cd290' }
    ]

    const items2 = [
        { label: 'Study node', value: '5f6f7ba32904280b7d31a36d' },
        { label: 'Study flutter', value: '5f6f7bc92904280b7d31a36e' },
        { label: 'Study aws', value: '5f6f847cf9e74b0c4e910017' },
    ]

    const options = {
        takePhotoButtonTitle: "Take photo from camera",
        chooseFromLibraryButtonTitle: "Choose image from gallery"
    }

    const base_url = useSelector((state) => {
        return state.base_url
    })

    const user_token = useSelector((state) => {
        return state.user_token
    })

    const chooseImage = () => {

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                console.log(source.uri)
                setAvatarSource(source.uri)
            }
        });
    }

    // const btnPressed = () => {
    //     axios.post(base_url + '/create_todo', {
    //         title: title,
    //         education: education,
    //         todos: JSON.stringify(todos),
    //         todo_date: date,
    //         photo: avatarSource
    //     },
    //         {
    //             headers: {
    //                 Authorization: 'Bearer ' + user_token
    //             }

    //         })
    //         .then(function (response) {
    //             console.log(response.data);
    //             if (response.data.error) {
    //                 console.log(response.data.error)
    //             }
    //             else {
    //                 console.log("success")
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }

    const btnPressed = () => {
        RNFetchBlob.fetch('POST', base_url + "/create_todo", {
            'Authorization': 'Bearer ' + user_token,
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'title', data: title },
            { name: 'education', data: education },
            { name: 'todos', data: JSON.stringify(todos) },
            { name: 'todo_date', data: date.toString() },

            { name: 'photo', filename: new Date().getTime() + "", type: 'image/jpeg', data: RNFetchBlob.wrap(avatarSource) }

        ]).then((res) => res.json())
            .then((response) => {
                console.log(response)
                if (response.error) {
                    console.log("errorrr--->", response.error)
                }
                else {
                    console.log("Successss-----")
                }
            }).catch((err) => {
                console.log("errorrrrrr=========>")
                console.log(err)
            });
    }


    return (
        <>
            <SafeAreaView style={styles.top} />
            <SafeAreaView style={styles.container}>
                <View style={{ padding: 20 }}>

                    <TextInput
                        style={{ marginBottom: 20 }}
                        placeholder="Todo title"
                        underlineColorAndroid="#c1c1c1"
                        onChangeText={(title) => setTitle(title)}
                    />
                    <DropDownPicker
                        items={items1}
                        max={10}
                        multiple={false}
                        placeholder="Select education"
                        containerStyle={{ height: 60 }}
                        style={{ borderColor: "#B8B8B8", marginBottom: 20 }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        labelStyle={{ color: "red", fontSize: 16 }}
                        onChangeItem={item => {
                            setEducation(item.value)
                            console.log(item)
                        }}
                    />

                    <DropDownPicker
                        items={items2}
                        max={10}
                        multiple={true}
                        multipleText="%d items have been selected."
                        placeholder="Select todos"
                        containerStyle={{ height: 60 }}
                        style={{ borderColor: "#B8B8B8", marginBottom: 20 }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        labelStyle={{ color: "red", fontSize: 16 }}
                        onChangeItem={item => {
                            setTodos(item)
                            console.log(item)
                        }}
                    />

                    <TouchableOpacity onPress={() => chooseImage()}>
                        <Text>Select image</Text>
                    </TouchableOpacity>



                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            //btnPressed()
                            navigation.navigate("HomeScreen")
                        }}>
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
        backgroundColor: "#FFFFFF"
    },
    btn: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: "blue",
        borderRadius: 50
    }
})
export default AddTodoScreen;