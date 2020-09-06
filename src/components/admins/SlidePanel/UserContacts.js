import React, { Component } from "react";

import { Menu, Icon } from "semantic-ui-react";

class UserContacts extends Component {
  render() {
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="user" /> CONTACTS
          </span>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}

export default UserContacts;
