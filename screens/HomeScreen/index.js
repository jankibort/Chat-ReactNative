import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import User from "../../User";
import styles from "../../constants/styles";
import firebase from "firebase";
import ProfileImage from "../../images/profile.png";

export default class HomeScreen extends Component {
  state = {
    users: [],
  };

  // FIXME:
  // aaa = () => {
  //   return <Text>AAA</Text>;
  // };
  // goToProfile = () => {
  //   return (
  //     <TouchableOpacity>
  //       <Image
  //         source={image}
  //         style={{ height: 38, width: 38, margin: 10 }}
  //         onPress={() => navigation.navigate("Profile")}
  //       />
  //       <Text>pizzzda</Text>
  //     </TouchableOpacity>
  //   );
  // };

  componentDidMount() {
    this.goToProfile;
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", (val) => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Chat", item);
        }}
        style={{ padding: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}
      >
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.phone}
        />
      </SafeAreaView>
    );
  }
}
