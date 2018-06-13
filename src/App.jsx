import React, { Component } from "react";
import IncomingMessage from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    };
  }
  componentDidMount() {

  this.socket = new WebSocket("ws://localhost:3001", "protocalOne");

    // setTimeout(() => {
    //   let newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
    //   let messages = this.state.messages.concat(newMessage);
    //   this.setState({ messages: messages });
    // }, 3000);
  }

  addMessage(username, content) {
    let newMessage = {type: "postMessage" , username: username, content: content };
    this.socket.send(JSON.stringify(newMessage));
    this.socket.onmessage = function(event){
      let messageData = JSON.parse(event.data)
      if (messageData.type === "incomingMessage"){
        let messages = this.state.messages.concat(messageData);
      this.setState({ messages: messages });  
      }
    }.bind(this);
    
    // addNotification(content){
    //   let newNotification = {type: "postNotification", content: "newNotification"};
    //   this.socket.send(JSON.stringify(newNotification));
    //   this.socket.onmessage = function(event){
    //     let notificationData = JSON.parse(event.data);
    //   //   if (notificationData.type === "incomingNotification"){
          
    //   // }
    // }
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          addMsgFcn={this.addMessage.bind(this)}
        />
      </div>
    );
  }
}
export default App;
