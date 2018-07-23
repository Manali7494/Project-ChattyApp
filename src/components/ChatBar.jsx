import React, { Component } from "react";
import * as ActionCreator from '../actions/chatBarActionCreator.js'
import { connect } from 'react-redux';
// Renders and handles text inputs for Username and Chat

class ChatBar extends Component {
  
  handleUsernameChange(event) {
    // let storedUsername = this.props.user;
    let displayUsername = event.target.value;
    this.props.changeUser(displayUsername)

  //   // if (storedUsername !== displayUsername) {
  //   //   // this.props.userChangeFcn(displayUsername);
    }

    
  // }
  handleMessageSubmission(event) {
    if (event.key === "Enter") {
      // let username = this.refs.userName.value;
      let content = event.target.value;
      console.log(content)
      this.props.addMessage(content);
      event.target.value = "";
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
        {console.log(this.props.userChangeProp.currentUser.name)}
        {console.log(this.props)}
        {console.log(this.props.userChangeProp.messages)}
        <input
          name="chatMessage"
          className="chatbar-message" 
          onKeyPress = {this.handleMessageSubmission.bind(this)} 
          />
      </footer>
    );
  }
}

export default connect(
  (state) => {
  return{
    userChangeProp: state
  }
}, ActionCreator)(ChatBar);
