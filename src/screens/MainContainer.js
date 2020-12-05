import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, Image } from 'react-native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import AddTodoScreen from './AddTodoScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator()

const MainContainer = () => {

    const profileImg = useSelector((state) => {
        return state.profile_img;
    })

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                    headerShown: false
                }}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    headerShown: false
                }}
                />
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{
                    headerShown: false
                }}
                />
                <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} options={({ navigation }) => ({
                    title: "Add Todo",
                    headerTitleAlign: "left",
                    headerRight: () => (
                        <TouchableOpacity style={{ padding: 15 }} onPress={() => {
                            navigation.navigate("HomeScreen")
                        }}>
                            <Text style={{ fontWeight: "bold" }}>Home</Text>
                        </TouchableOpacity>
                    )
                })}
                />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={({ navigation }) => ({
                    title: "Home",
                    headerTitleAlign: "left",
                    headerRight: () => (
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                navigation.navigate("AddTodoScreen")
                            }}>
                                <Text style={{ fontWeight: "bold" }}>Add ToDo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                navigation.navigate("ProfileScreen")
                            }}>
                                <Image style={{ height: 30, width: 30, borderRadius: 15 }} resizeMode="cover" source={{ uri: profileImg ? profileImg : "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" }} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
                />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={({ navigation }) => ({
                    title: "Profile",
                    headerTitleAlign: "center",
                })}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default MainContainer;