import React, { Component } from "react";
import { ActivityIndicator, View, StatusBar, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import User from "../../User";
import firebase from "firebase";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    let config = {
      apiKey: "AIzaSyBvQzR4ULWccem_sGbJUlL5vB6ixo3KPkY",
      authDomain: "reactnative-chatapp-9b122.firebaseapp.com",
      databaseURL: "https://reactnative-chatapp-9b122.firebaseio.com",
      projectId: "reactnative-chatapp-9b122",
      storageBucket: "reactnative-chatapp-9b122.appspot.com",
      messagingSenderId: "505628089759",
      appId: "1:505628089759:web:e646d83b87d7088c7bf1aa",
      measurementId: "G-H74LPHSVES",
    };
    firebase.initializeApp(config);
  }

  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem("userPhone");
    this.props.navigation.navigate(User.phone ? "Home" : "Login");
  };

  goToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar style="default" />
        <Button onPress={this.goToLogin} title="press" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
