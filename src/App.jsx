import React, { Component } from "react";
import IncomingMessage from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import IncomingNotification from "./Notification.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      notification: ""
    };
  }
  componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001", "protocalOne");
    // setTimeout(() => {
    //   let newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
    //   let messages = this.state.messages.concat(newMessage);
    //   this.setState({ messages: messages });
    // }, 3000);

    this.socket.onopen = (event) => {
      console.log("connected to server")
    }

    this.socket.onmessage = (event) => {
    const data = JSON.parse (event.data);
    if (data.type === 'incomingMessage')
  {  
      let message = this.state.messages.concat(data);
      this.setState({ messages: message });
  }
    
    if (data.type === 'incomingNotification')
    {let notificationData = JSON.parse(event.data);
        if (notificationData.type === "incomingNotification"){  
          this.setState({notification: notificationData.content})
        //  this.setState = ({userChanged: notificationData.content})
//        console.log(notificationData.content);
        }
      }
  }
} // end of component did mount

  addMessage(username, content) {
    let newMessage = {type: "postMessage" , username: username, content: content };
    this.socket.send(JSON.stringify(newMessage));
    // if (username !== this.state.currentUser.name){
    //   let oldUsr = this.state.currentUser.name;
    //   let newUsr = username;
    //   console.log(`old user name is ${oldUsr}`)
    //   console.log(`new username is ${newUsr}`)
      // this.setState = ({userChanged: `${oldUsr} has changed their name to ${newUsr}`})
    //    this.setState = ({currentUser: {name: username}})
    //   let newNotification = {type: "postNotification", content: 'the notification sent correctly'};
    //   this.socket.send(JSON.stringify(newNotification));
    // }
    // this.socket.onmessage = function(event){
    //   let messageData = JSON.parse(event.data)
    //   if (messageData.type === "incomingMessage"){
    //     let messages = this.state.messages.concat(messageData);
    //   this.setState({ messages: messages });  
    //   }
    //}.bind(this);
  }
    
    addUser(newUsername){
      let oldUsr = this.state.currentUser.name;
      let newUsr = newUsername;
      console.log(this);
      this.setState({currentUser: {name: newUsr}})
      const content = `${oldUsr} has changed their name to ${newUsr}`
      let newNotification = {type: "postNotification", content: content};
      this.socket.send(JSON.stringify(newNotification));
      // this.socket.onmessage = function(event){
      //   let notificationData = JSON.parse(event.data);
      //   if (notificationData.type === "incomingNotification"){  
      //     console.log(notificationData);
      // }
    //}.bind(this)
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} notif={this.state.notification}/>
        <ChatBar
          addMsgFcn={this.addMessage.bind(this)} 
          addUserFcn = {this.addUser.bind(this)}
           user={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;
