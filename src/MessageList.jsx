import React, { Component } from "react";
import Message from "./Message.jsx";
import IncomingNotification from './Notification.jsx';
class MessageList extends Component {
  getList() {
    let list = this.props.messages.map((item, index) => {
    
       return(<Message key={item.id} msgUsr={item.username} msgContent={item.content}/>)
    });
    return list
  }
  render() {
    return (
      <div> 
        <main className="messages">
    <IncomingNotification notif={this.props.notif}/>
    {this.getList()}
  </main>
    </div>
    )
  }
}

export default MessageList;
