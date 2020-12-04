import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import HomeScreen from './src/screens/HomeScreen';


import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './src/reducers/reducer'
import { TouchableOpacity } from 'react-native-gesture-handler';


const Stack = createStackNavigator()

const store = createStore(reducer);
//this is a test for checking git fork
const App = () => {
  return (
    <Provider store={store}>
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
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
            headerRight: () => (
              <TouchableOpacity style={{ padding: 15 }} onPress={() => {
                navigation.navigate("HomeScreen")
              }}>
                <Text style={{ fontWeight: "bold" }}>Home</Text>
              </TouchableOpacity>
            )
          })}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
            title: "Home",
            headerTitleAlign: "center",
            headerBackTitleVisible: false
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App;