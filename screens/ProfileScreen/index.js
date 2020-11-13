import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, SafeAreaView, Alert, TextInput } from "react-native";
import User from "../../User";
import styles from "../../constants/styles";

export default class ProfileScreen extends Component {
  state = {
    name: User.name,
  };

  handleChange = (key) => (val) => {
    this.setState({ [key]: val });
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert("Error", "Enter valid name");
    } else if (User.name !== this.state.name) {
      firebase.database
        .ref("users")
        .child(User.phone)
        .set({ name: this.state.name });
      User.name = this.state.name;
      Alert.alert("Success", "Name changed successfuly");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20 }}>User.phone</Text>
        <Text style={{ fontSize: 20 }}>User.name</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChange={this.handleChange("name")}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnText}>Change Name</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
