import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import { connect } from 'react-redux';
import * as ActionCreator from '../actions/AppActionCreator.js'
// Main React Component 
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //     // currentUser: { name: "Anonymous" },
  //     // messages: [],
  //     // connection: 0
  //   // };
  // }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log("connected to server");
    };

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);

      // Setting value for Number of users online
      // if (data.type === "connect") {
      //   this.setState({ connection: data.num });
      // }

      // Chat message content
      if (data.type === "incomingMessage") {
        this.props.addMessage(data)
        // let message = this.state.messages.concat(data);
        // this.setState({ messages: message });
      }

      // Username change notification content
      if (data.type === "incomingNotification") {
        let notificationData = JSON.parse(event.data);
        if (notificationData.type === "incomingNotification") {
          this.props.addMessage(notificationData)
          // Need to update the user in the state as well. 

          // let notification = this.state.messages.concat(notificationData);
          // this.setState({ messages: notification });
        }
      }
    };
  } 

  sendMessage(messageObject){
    this.socket.send(messageObject)
  }

  // userChange(newUsername) {
  //   let oldUsr = this.state.currentUser.name;
  //   let newUsr = newUsername;
  //   this.setState({ currentUser: { name: newUsr } });
  //   const content = `${oldUsr} has changed their name to ${newUsr}`;
  //   let newNotification = { type: "postNotification", content: content };
  //   this.socket.send(JSON.stringify(newNotification));
  // }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          {/* <div id="online">{this.state.connection} users online</div> */}
        </nav>
        {/* <MessageList messages={this.state.messages} /> */}
        <ChatBar
          sendMessage={this.sendMessage.bind(this)}
          userChangeProp={this.props.userChangeProp}
          changeUser={this.props.changeUser}
          // addMsgFcn={this.addMessage.bind(this)}
          // userChangeFcn={this.userChange.bind(this)}
          // user={this.state.currentUser}
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
