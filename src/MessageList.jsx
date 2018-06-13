import React, { Component } from "react";
import Message from "./Message.jsx";
class MessageList extends Component {
  getList() {
    let list = this.props.messages.map((item, index) => {
    
       return(<Message key={item.id} msgUsr={item.username} msgContent={item.content}/>)
    });
    return <div> {list} </div>;
  }

  render() {
    return <div> {this.getList()} </div>;
  }
}

export default MessageList;
