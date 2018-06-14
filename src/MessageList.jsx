import React, { Component } from "react";
import Message from "./Message.jsx";
import IncomingNotification from './Notification.jsx';
class MessageList extends Component {
  getList() {
    let list = this.props.messages.map((item) => {
    
      if (item.type === "incomingMessage"){
        return(<Message key={item.id} msgUsr={item.username} msgContent={item.content}/>)        
      }
      else if (item.type === "incomingNotification"){
        return (<IncomingNotification key={item.id} notif={item.content} />)
      }
    });
    return list
  }
  render() {
    return (
      <div> 
        <main className="messages">
    {this.getList()}
  </main>
    </div>
    )
  }
}

export default MessageList;
