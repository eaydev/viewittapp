import React, {Component} from 'react';

export default class Loader extends Component{
  render(){
    return(
      <div className="container-fluid text-center pt-4 pb-4">
        <div className="spinner-border text-danger" role="status" style={{width: "3rem", height: "3rem"}}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}
