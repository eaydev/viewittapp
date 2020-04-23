import React, {Component} from 'react';

export default class Notification extends Component{
  render(){
    return(
      <div className={`notif badge bg-${this.props.type === "error" ? "danger" : "info"} p-2 container-fluid fixed-top`}>
              {this.props.message}
      </div>
    )
  }
}
