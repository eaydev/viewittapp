import React, {Component} from 'react';

export default class Badge extends Component{
  constructor(props){
    super(props);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler(){
    this.props.deleteSubHandler(this.props.sub);
  }

  render(){
    return(
      <span className="badge badge-danger text-light p-2 m-1">
        {this.props.sub}
        <span className="ml-2 cursor-pointer" onClick={this.deleteHandler}>x</span>
      </span>
    )
  }
}
