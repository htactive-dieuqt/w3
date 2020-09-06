import React, { Component } from "react";
// import { firebase } from "../../../firebase/firebase";
import Contacts from "../Contacts/Contacts";

import { Menu, Icon } from "semantic-ui-react";

class Categiries extends Component {
  render() {
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="" /> CATEGORIES
          </span>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}

export default Categiries;
