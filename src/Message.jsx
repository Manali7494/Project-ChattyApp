import React, { Component } from "react";

//Displays chat message by users
class Message extends Component {
  
  constructor(){
    super();
  }
  
  render() {
    const usrStyle = {
      color: this.props.color
    };

    const imgStyle = {
      height: '60%'
    };

    let msg = this.props.msgContent;
    let result = (msg.endsWith('.png') || msg.endsWith('.jpg') || msg.endsWith('.gif')) ? 
    (<span className="message-content"><img style={imgStyle} src={msg}/></span>) 
    : (<span className="message-content"> {this.props.msgContent}</span>)

    return (
      <div className="message">
        <span className="message-username" style={usrStyle}>
          {this.props.msgUsr}
        </span>
        {result}
      </div>
    )
  }
}

export default Message;
