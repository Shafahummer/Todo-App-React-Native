import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import HomeScreen from './src/screens/HomeScreen';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './src/reducers/reducer'


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
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
            title: "Login",
            headerTitleAlign: "center",
          }}
          />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{
            title: "Registration",
            headerTitleAlign: "center",
            headerBackTitleVisible: false
          }}
          />
          <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} options={{
            title: "Add Todo",
            headerTitleAlign: "center",
            headerBackTitleVisible: false
          }}
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