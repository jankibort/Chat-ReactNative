import React, { Component } from "react";
import { render } from "react-dom";

class HomeHeader extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Profile")}
      >
        <Image source={image} style={{ height: 38, width: 38, margin: 10 }} />
      </TouchableOpacity>
    );
  }
}
export default HomeHeader;
