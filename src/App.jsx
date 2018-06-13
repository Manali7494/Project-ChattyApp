import React, { Component } from "react";
import IncomingMessage from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }
  componentDidMount() {

  this.socket = new WebSocket("ws://localhost:3001", "protocalOne");
    // this.socket.onopen = function(event) {
      
    // };
    setTimeout(() => {
      let newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      let messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
    }, 3000);
  }

  addMessage(username, content) {
    let currentLength = this.state.messages.length;
    let msgId = currentLength + 1;
    let newMessage = { id: msgId, username: username, content: content };
    this.socket.send(JSON.stringify(newMessage));
    //let messages = this.state.messages.concat(newMessage);
    //this.setState({ messages: messages });
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
          user={this.state.currentUser}
          addMsgFcn={this.addMessage.bind(this)}
        />
      </div>
    );
  }
}
export default App;
