import React, {Component} from 'react';

export default function Notification(props){
  return(
    <div className={`notif badge bg-${props.type === "error" ? "danger" : "info"} p-2 container-fluid fixed-top`}>
            {props.message}
    </div>
  )
}
