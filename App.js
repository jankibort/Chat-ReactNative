import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Image, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen/index";
import HomeScreen from "./screens/HomeScreen";
import AuthLoadingScreen from "./screens/LoginScreen/AuthLoadingScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen/index";
import HomeHeader from "./screens/HomeScreen/components/HeaderRight";
import image from "./images/profile.png";
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading">
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Chats",
              // headerRight: () => (

              // ),
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
