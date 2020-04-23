import React, {Component} from 'react';

export default class ModeButton extends Component{
render(){
    return(
      <React.Fragment>
        {this.props.darkMode === true ?
          <button className="btn btn-dark m-1 text-warning shadow" onClick={this.props.modeToggleHandler}>&#9790;</button> :
          <button className="btn btn-light m-1 text-dark border" onClick={this.props.modeToggleHandler}>&#9728;</button>
        }
      </React.Fragment>

    )
  }
}
