import React, { Component } from "react";
// import { firebase } from "../../../firebase/firebase";

import { Menu, Icon } from "semantic-ui-react";

class UserList extends Component {
  render() {
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="user" /> USER
          </span>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}

export default UserList;
