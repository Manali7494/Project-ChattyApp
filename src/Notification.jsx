import React, { Component } from "react";

//Displays notification for user change
class IncomingNotification extends Component {
  render() {
    const usrStyle = {
      color: this.props.color
    };
    return (
      <div style={usrStyle} className="message system">
        {this.props.notif}
      </div>
    );
  }
}

export default IncomingNotification;
