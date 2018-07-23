import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import { connect } from 'react-redux';
import * as ActionCreator from '../actions/AppActionCreator.js'
// Main React Component 
class App extends Component {
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log("connected to server");
    };

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);

      // Setting value for Number of users online
      if (data.type === "connect") {
        this.props.returnConnection(data.num);
      }

      // Chat message content
      if (data.type === "incomingMessage") {
        this.props.addMessage(data)
      }

      // Username change notification content
      if (data.type === "incomingNotification") {
        let notificationData = JSON.parse(event.data);
        if (notificationData.type === "incomingNotification") {
          this.props.addMessage(notificationData)
        }
      }
    };
  } 

  sendMessage(messageObject){
    this.socket.send(messageObject)
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <div id="online">{this.props.userChangeProp.connection} users online</div>
        </nav>
        <MessageList messages={this.props.userChangeProp.messages} />
        <ChatBar
          sendMessage={this.sendMessage.bind(this)}
          userChangeProp={this.props.userChangeProp}
          changeUser={this.props.changeUser}
        />
      </div>
    );
  }
}
export default connect(
  (state) => {
  return{
    userChangeProp: state
  }
}, ActionCreator)(App);
