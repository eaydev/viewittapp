import React, {Component} from 'react';

export default class Footer extends Component{
  render(){
    return(
      <div className="container-fluid text-center p-2 pt-3">
        <p>Made with <span style={{color: 'red', fontSize: '1.4em'}}>&#x2665;</span> by <a href="https://www.reddit.com/user/fin_gw">eaydev</a></p>
      </div>
    )
  }
}
