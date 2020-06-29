import React, { useContext } from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StoreContext, StoreProvider } from "../../src/stores";
import LoginScreen from "../../src/screens/LoginScreen";
import UserScreen from "../../src/screens/UserScreen";


import AccountScreen from '../AccountScreen'

const Stack = createStackNavigator();
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpghpn6rtCHkYXso1iYXlffe7IJAuoFTU",
    authDomain: "appfinal-23a98.firebaseapp.com",
    databaseURL: "https://appfinal-23a98.firebaseio.com",
    projectId: "appfinal-23a98",
    storageBucket: "appfinal-23a98.appspot.com",
    messagingSenderId: "235000499477",
    appId: "1:235000499477:web:6bbe48130682cf4afe6d1c"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AccountStackScreen = () => {
  const { isLoginState } = useContext(StoreContext);
  const [ isLogin, setIsLogin] = isLoginState;
  return isLogin ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            headerTitleStyle: {
              fontWeight: "400",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={AccountScreen}
          options={{
            headerTitleStyle: {
              fontWeight: "400",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <StoreProvider>
      <AccountStackScreen />
    </StoreProvider>
  );
};

