import React, { Component } from 'react';

class ChatBar extends Component {
  
  handleChange(event){
    if (event.key === 'Enter'){
      let username = this.refs.userName.value;
      let content = event.target.value;
     this.props.addMsgFcn(username,content);
     event.target.value = '';
    }
  }
  
  render() {
    return (
      <footer className="chatbar" >
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)" ref='userName'
          // defaultValue = {this.props.user.name}
          />
        <input
          name='chatMessage'
          className="chatbar-message"
          placeholder="Type a message and hit ENTER" onKeyPress={this.handleChange.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
