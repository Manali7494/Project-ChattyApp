import React, { Component } from "react";

class IncomingNotification extends Component {     
    render() { 
        return (
          <div className="message system">
            {this.props.notif}

          </div>
        );
      }
    }
    
export default IncomingNotification;