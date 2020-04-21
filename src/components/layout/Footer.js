import React, {Component} from 'react';

export default class Footer extends Component{
  render(){
    return(
      <div className="container-fluid text-center bg-light p-2 pt-3">
        <p>Made with <span style={{color: 'red', fontSize: '1.4em'}}>&#x2665;</span> by <a href="https://twitter.com/eaydev">eaydev</a></p>
      </div>
    )
  }
}
