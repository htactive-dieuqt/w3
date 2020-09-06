import React from "react";
import { Menu } from "semantic-ui-react";

import Channels from "./Channels";
import UserPanel from "./UserPanel";
// import DirectMessages from "./DirectMessages";
import UserList from "./UserList";
import Categories from "./Categories";
import UserContacts from "./UserContacts";

class SlidePanel extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{
          bankground: "#97FFFF",
          fontSize: "1.2rem",
        }}
      >
        <UserPanel currentUser={currentUser} />
        <UserContacts currentUser={currentUser} />
        <UserList currentUser={currentUser} />
        <Categories currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        {/* <DirectMessages currentUser={currentUser} /> */}
      </Menu>
    );
  }
}

export default SlidePanel;
