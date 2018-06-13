import React, { Component } from "react";

class IncomingNotification extends Component {     
    render() {
        console.log("HELLO IT IS RECEIVED!")  
        return (
          <div className="message system">
            {this.props.content}

          </div>
        );
      }
    }
    
export default IncomingNotification;