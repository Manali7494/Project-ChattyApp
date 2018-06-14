import React, { Component } from "react";

//Displays chat message by users
class Message extends Component {
  render() {
    const usrStyle = {
      color: this.props.color
    };
    return (
      <div className="message">
        <span className="message-username" style={usrStyle}>
          {this.props.msgUsr}
        </span>
        <span className="message-content">{this.props.msgContent}</span>
      </div>
    );
  }
}
export default Message;
