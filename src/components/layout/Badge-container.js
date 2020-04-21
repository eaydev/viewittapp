import React, {Component} from 'react';

export default class BadgeContainer extends Component{
  render(){
    return(
      <section className="p-2 p-sm-3 mt-4 mt-md-2 text-md-left text-center">
        <div className="container">
          <h4 className="p-0 h5 font-weight-bold">Current subreddit list:</h4>
          <p>
            {this.props.children}
          </p>
        </div>

      </section>
    )
  }
}
