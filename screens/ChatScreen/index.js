import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "../../constants/styles";
import firebase from "firebase";
import User from "../../User";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.route.params.name,
        phone: props.route.params.phone,
      },
      textMessage: "",
      messageList: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("messages")
      .child(User.phone)
      .child(this.state.person.phone)
      .on("child_added", (val) => {
        this.setState((prevState) => {
          return {
            messageList: [...prevState.messageList, val.val()],
          };
        });
      });
  }

  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = d.getHours() < 10 ? "0" : "" + d.getHours() + ":";
    result += d.getMinutes() < 10 ? "0" : "" + d.getMinutes();

    if (c.getDay() !== d.getDay()) {
      let datePrefix = null;
      if (d.getDay() < 10) {
        datePrefix = "0";
      }
      result =
        datePrefix +
        d.getDay() +
        "." +
        d.getMonth() +
        "." +
        d.getFullYear() +
        "  " +
        result;
    }

    return result;
  };

  handleChange = (key) => (val) => {
    this.setState({ [key]: val });
  };

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;

      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };
      updates[
        "messages/" + User.phone + "/" + this.state.person.phone + "/" + msgId
      ] = message;
      updates[
        "messages/" + this.state.person.phone + "/" + User.phone + "/" + msgId
      ] = message;
      firebase.database().ref().update(updates);
      this.setState({ textMessage: "" });
    }
  };

  renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          maxWidth: "70%",
          alignSelf: item.from === User.phone ? "flex-end" : "flex-start",
          backgroundColor: item.from === User.phone ? "#00897b" : "#7cb342",
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", padding: 7, fontSize: 16 }}>
          {item.message}
        </Text>
        <Text style={{ color: "#eee", padding: 3, fontSize: 11 }}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      <SafeAreaView>
        <FlatList
          style={{ padding: 10, height: height * 0.8 }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <TextInput
            value={this.state.textMessage}
            placeholder="Type message..."
            onChangeText={this.handleChange("textMessage")}
            style={styles.input}
          />
          <TouchableOpacity
            style={{ paddingBottom: 10, marginLeft: 5 }}
            onPress={this.sendMessage}
          >
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
