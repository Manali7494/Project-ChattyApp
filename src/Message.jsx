import React, { Component } from 'react';


class Message extends Component{
render(){
  return(
         <div className="message">
           <span className="message-username">{this.props.msgUsr}</span>
           <span className="message-content">{this.props.msgContent}</span>
         </div>   
  )
}
}
export default Message;

