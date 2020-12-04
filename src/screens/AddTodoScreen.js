import React, { useState, useEffect } from 'react';
import {
    Platform,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Image,
    ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTodoScreen = ({ navigation }) => {

    const myUrl = "https://cdn2.iconfinder.com/data/icons/image-editing-6/1000/Image_Edit-14-512.png";

    const [title, setTitle] = useState("")
    const [education, setEducation] = useState(null)
    const [todos, setTodos] = useState(null)
    const [avatarSource, setAvatarSource] = useState(myUrl)
    const [educationList, setEducationList] = useState(null)
    const [todoList, setTodoList] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selectedDate, setSelectedDate] = useState("select date");

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        setSelectedDate(currentDate.toISOString().split('T')[0])


        console.log("selected date----", currentDate.toISOString().split('T')[0]);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };







    const educationListArray = [];
    const todoListArray = [];

    const base_url = useSelector((state) => {
        return state.base_url
    })

    const user_token = useSelector((state) => {
        return state.user_token
    })

    useEffect(() => {
        getEducation()
        getTodos()
    }, [])

    const getEducation = () => {
        axios.get(`${base_url}/get_educations`,
            {
                headers: {
                    Authorization: 'Bearer ' + user_token
                }
            })
            .then(function (response) {
                if (response.data.error) {
                    Toast.show(response.data.error)
                } else {
                    const apiData = response.data.educations;
                    apiData.map((i, j) => {
                        const d = { "label": i.education, "value": i._id }
                        educationListArray.push(d)
                    })
                    setEducationList(educationListArray)
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    const getTodos = () => {
        axios.get(`${base_url}/get_todos`,
            {
                headers: {
                    Authorization: 'Bearer ' + user_token
                }
            })
            .then(function (response) {
                if (response.data.error) {
                    Toast.show(response.data.error)
                } else {
                    const apiData = response.data.todos;
                    apiData.map((i, j) => {
                        const d = { "label": i.todo, "value": i._id }
                        todoListArray.push(d)
                    })
                    setTodoList(todoListArray)
                    console.log("DATA : ", response.data.todos);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    const options = {
        takePhotoButtonTitle: "Take photo from camera",
        chooseFromLibraryButtonTitle: "Choose image from gallery"
    }



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

    const btnPressed = () => {
        if (education === null || todos === null || date === null) {
            Toast.show("All fields are mandatory...")
        } else {
            setLoading(true)
            RNFetchBlob.fetch('POST', base_url + "/create_todo", {
                'Authorization': 'Bearer ' + user_token,
                'Content-Type': 'multipart/form-data',
            }, avatarSource != myUrl ?
                [
                    { name: 'title', data: title },
                    { name: 'education', data: education },
                    { name: 'todos', data: JSON.stringify(todos) },
                    { name: 'todo_date', data: date.toString() },
                    { name: 'photo', filename: new Date().getTime() + "", type: 'image/jpeg', data: Platform.OS === "android" ? RNFetchBlob.wrap(avatarSource) : RNFetchBlob.wrap(avatarSource.replace('file:///', '')) }
                ]
                :
                [
                    { name: 'title', data: title },
                    { name: 'education', data: education },
                    { name: 'todos', data: JSON.stringify(todos) },
                    { name: 'todo_date', data: date.toString() },
                ]
            ).then((res) => res.json())
                .then((response) => {
                    setLoading(false)
                    console.log(response)
                    if (response.error) {
                        Toast.show(response.error)
                        console.log("errorrr--->", response.error)
                    }
                    else {
                        Toast.show("Successfully added todo...")
                    }
                }).catch((err) => {
                    setLoading(false)
                    Toast.show(err.toString())
                    console.log("errorrrrrr=========>")
                    console.log(err)
                });
        }
    }


    return (
        <>
            <SafeAreaView style={styles.top} />
            <SafeAreaView style={styles.container}>
                {(educationList && todoList) ?
                    <View style={{ padding: 20 }}>

                        <TextInput
                            style={{ marginBottom: 20, borderWidth: 1, height: 40, paddingLeft: 15, borderRadius: 4, fontSize: 16 }}
                            placeholder="Enter todo title"
                            borderColor="#c1c1c1"
                            placeholderTextColor="#000000"
                            onChangeText={(title) => setTitle(title)}
                        />
                        <DropDownPicker
                            zIndex={100}
                            items={educationList}
                            max={10}
                            multiple={false}
                            placeholder="Select education"
                            containerStyle={{ height: 60 }}
                            style={{ borderColor: "#B8B8B8", marginBottom: 20, zIndex: 100 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            labelStyle={{ color: "#000000", fontSize: 16 }}
                            onChangeItem={item => {
                                setEducation(item.value)
                                console.log(item.value)
                            }}
                        />

                        <DropDownPicker
                            defaultValue={todoList[0]}
                            zIndex={90}
                            items={todoList}
                            max={10}
                            multiple={true}
                            multipleText="%d items have been selected."
                            placeholder="Select todos"
                            containerStyle={{ height: 60 }}
                            style={{ borderColor: "#B8B8B8", marginBottom: 20 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            labelStyle={{ color: "#000000", fontSize: 16 }}
                            onChangeItem={item => {
                                setTodos(item)
                                console.log(item)
                            }}
                        />


                        <TouchableOpacity style={{ height: 40, borderColor: "#c1c1c1", borderWidth: 1, justifyContent: "center", paddingLeft: 15, borderRadius: 4, marginBottom: 20 }} onPress={() => {
                            showDatepicker()
                        }}>
                            <Text style={{ fontSize: 16, color: "#000000" }}>{selectedDate}</Text>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                style={{ zIndex: 100000 }}
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}

                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => chooseImage()}>
                                <Image source={{ uri: avatarSource }} resizeMode="stretch" style={{ width: 100, height: 100 }} />
                                <Text style={{ color: "#000", marginTop: 5 }}>Choose image</Text>
                                <Text style={{ color: "#000" }}>(optional)</Text>
                            </TouchableOpacity>
                            {loading &&
                                <ActivityIndicator style={{ marginLeft: "20%" }} size="large" color="#75DA8B" />
                            }
                        </View>


                        <View style={{ alignItems: "center", marginTop: 30 }}>
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                btnPressed()
                                // navigation.navigate("HomeScreen")
                            }}>
                                <Text style={{ color: "#FFFFFF" }}>Save Todo</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    :
                    <View style={{ alignItems: "center" }}>
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
    btn: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: "blue",
        borderRadius: 50
    }
})
export default AddTodoScreen;