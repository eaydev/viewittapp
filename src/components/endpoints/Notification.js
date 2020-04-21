import React, {Component} from 'react';

export default class Notification extends Component{
  render(){
    //Style depending on the nature of message.
    let _styling;
      if(this.props.type === "error"){
        _styling = "btn btn-danger shadow-lg m-0 w-100 rounded-0 p-0 pt-1 pb-1 position-fixed mt-1 anim-fadedown";
      } else if (this.props.type === "success"){
        _styling = "btn btn-success shadow-lg m-0 w-100 rounded-0 p-0 pt-1 pb-1 position-fixed mt-1 anim-fadedown"
      } else if (this.props.type === "info"){
        _styling = "btn btn-info shadow-lg m-0 w-100 rounded-0 p-0 pt-1 pb-1 position-fixed mt-1 anim-fadedown"
      }

    return(
      <p className={_styling} style={{top: 0, zIndex: 9999}}>{this.props.message}</p>
    )
  }
}
