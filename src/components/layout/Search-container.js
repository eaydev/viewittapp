import React, {Component} from 'react';

export default class SearchBody extends Component{
  constructor(props){
    super(props);
    this.state = {
      listenerAdded : false
    }
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentDidUpdate(){
    //Adding listener post initial content.
    if(this.props.children.length !== 0 && this.state.listenerAdded !== true ){
      this.setState({listenerAdded : true}, function(){
        window.addEventListener("scroll", this.scrollHandler);
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler(){
    let container = document.querySelectorAll(".album");
    let containerDimensions = container[0].getBoundingClientRect();
    let containerBottom = containerDimensions["bottom"];

    if(containerBottom <= window.innerHeight && this.props.postsLoading === false){
      this.props.loadHandler();
    }
  }

  render(){
    return(
      <div className="album">
        <div className="container">
          <div className="row justify-content-center">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
