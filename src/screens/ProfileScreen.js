import React, { useState } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';

const ProfileScreen = ({ navigation }) => {

    const [avatarSource, setAvatarSource] = useState(null)

    const profileImg = useSelector((state) => {
        return state.profile_img;
    })

    const base_url = useSelector((state) => {
        return state.base_url;
    })

    const user_token = useSelector((state) => {
        return state.user_token;
    })

    const dispatch = useDispatch()

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

    const uploadImage = () => {
        RNFetchBlob.fetch('PUT', base_url + "/update_user", {
            'Authorization': 'Bearer ' + user_token,
            'Content-Type': 'multipart/form-data',
        },
            [
                { name: 'photo', filename: new Date().getTime() + "", type: 'image/jpeg', data: Platform.OS === "android" ? RNFetchBlob.wrap(avatarSource) : RNFetchBlob.wrap(avatarSource.replace('file:///', '')) }
            ]
        ).then((res) => res.json())
            .then((response) => {
                console.log(response)
                if (response.error) {
                    Toast.show(response.error)
                    console.log("errorrr--->", response.error)
                }
                else {
                    dispatch({ type: "SET_PROFILE_IMG", payload: avatarSource })
                    Toast.show("Successfully uploaded...")
                    setTimeout(() => {
                        navigation.goBack()
                    }, 2000)
                }
            }).catch((err) => {
                Toast.show(err.toString())
                console.log("errorrrrrr=========>")
                console.log(err)
            });
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {avatarSource ?
                <Image resizeMode="contain" style={{ width: 200, height: 100 }} source={{ uri: avatarSource }} />
                :
                <Image resizeMode="contain" style={{ width: 200, height: 100 }} source={{ uri: profileImg ? profileImg : "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" }} />
            }
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity style={{ marginRight: 10, backgroundColor: "#53E0BC", paddingHorizontal: 25, paddingVertical: 15, borderRadius: 30 }} onPress={() => {
                    chooseImage()
                }}>
                    <Text>Choose Image</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={avatarSource ? false : true} style={{ backgroundColor: avatarSource ? "#53E0BC" : "#c1c1c1", paddingHorizontal: 25, paddingVertical: 15, borderRadius: 30 }} onPress={() => {
                    uploadImage()
                }}>
                    <Text>Upload</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default ProfileScreen;