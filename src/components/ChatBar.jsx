import React, { Component } from "react";

// Renders and handles text inputs for Username and Chat

class ChatBar extends Component {
  
  handleUsernameChange(event) {
    // let storedUsername = this.props.user;
    let displayUsername = event.target.value;
    let oldUsr = this.props.userChangeProp.currentUser.name
    if (oldUsr !== displayUsername){
      this.props.changeUser(displayUsername)
      const content = `${oldUsr} has changed their name to ${displayUsername}`;
      let newNotification = { type: "postNotification", content: content };
      this.props.sendMessage(JSON.stringify(newNotification))
      }
    }

    handleMessageSubmission(event) {
    if (event.key === "Enter") {
      let username = this.props.userChangeProp.currentUser.name;
      let content = event.target.value;
      let newMessage = {
      type: "postMessage",
      username: username,
      content: content
    };
    this.props.sendMessage(JSON.stringify(newMessage));
    event.target.value = '';
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          ref="userName"
          onBlur={this.handleUsernameChange.bind(this)}
          defaultValue="Anonymous"
        />
        {console.log(this.props)}
        <input
          name="chatMessage"
          className="chatbar-message" 
          onKeyPress = {this.handleMessageSubmission.bind(this)} 
          />
      </footer>
    );
  }
}

export default ChatBar;
