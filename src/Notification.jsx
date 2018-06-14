import React, { Component } from "react";

class IncomingNotification extends Component {     
    render() {
      const usrStyle = {
        color: this.props.color
      } 
        return (
          <div style={usrStyle} className="message system">
            {this.props.notif}
          </div>
        );
      }
    }
    
export default IncomingNotification;