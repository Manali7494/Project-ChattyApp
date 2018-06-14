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

// class IncomingMessage extends Component {
//   // constructor(props) {
//   //   super();
//   //   this.state = {
//   //     type: 'incomingMessage',
//   //     content:
//   //       'I won\'t be impressed with technology until I can download food.',
//   //     username: 'Anonymous1'
//   //   };
//   // }
//   render() {
//     return (
//       <main className="messages">
//         <div className="message">
//           <span className="message-username">Incoming Message</span>
//           <span className="message-content">I won't be impressed with technology until I can download food</span>
//         </div>
//          <IncomingNotification /> 
//       </main>
//     );
//   }
// }

class IncomingNotification extends Component {
  // constructor(props) {
  //   super();
  //   this.state = {
  //     type: 'incomingNotification',
  //     content: 'Anonymous1 changed their name to nomnom'
  //   };
  // }

  render() {
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}

