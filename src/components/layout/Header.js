import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchOn: false,
      expanded : false
    }
    this.menuToggle = this.menuToggle.bind(this);
    this.searchToggle = this.searchToggle.bind(this);
    this.toClipBoard = this.toClipBoard.bind(this);
  }

  menuToggle(){
    this.setState({expanded: !this.state.expanded});
  }

  searchToggle(){
    this.setState({searchOn: !this.state.searchOn});
  }

  toClipBoard(){
    let callBack = this.props.copyHandler;
    let listURL = `https://viewittapp.netlify.app${this.props.location.pathname}` ;
    //Putting together clipboard message.
    let message = `Check out my list: ${listURL}`;
    //Promise-bsed clipboard shiz
    navigator.clipboard.writeText(message).then(function() {
      callBack("Copied list successfully! 👍", "info")
    }, function() {
      callBack("Sorry your browser does not allow copying to clipboard. 😔", "error")
    });
  }

  render(){
    return(
      <React.Fragment>
        <header className="border-bottom">
          <nav className="navbar navbar-light bg-light navbar-expand-md">
            <div className="d-flex justify-content-start align-items-center">
              <span className="navbar-brand mb-0 text-muted cursor-pointer" onClick={this.menuToggle}>&#9776; <span style={{fontSize: "20px"}} className="ml-2">MENU</span></span>
              <button className="btn p-0 m-0 ml-lg-4 text-muted mb-1 cursor-pointer" onClick={this.searchToggle} style={{fontSize: "40px", transform: "rotate(90deg)", fontWeight: "900"}}>&#9740;</button>
            </div>

            {this.state.searchOn ?
              <div className="nav-container-custom text-right navbar-collapse collapse">
                {this.props.children}
              </div> :

              <React.Fragment>
                <span className="navbar-center-abs navbar-collapse collapse h4">viewitt</span>
                <div className="nav-container-custom text-right navbar-collapse collapse">
                  <span className="mr-auto"></span>
                  <button className="btn btn-warning m-1" onClick={this.toClipBoard}>Share this list</button>
                </div>
              </React.Fragment>
            }
            <span className="mb-0 navbar-brand h3 navbar-toggler border-0 text-dark">Viewitt</span>



          </nav>
        </header>

        <div className={this.state.expanded ? "container-fluid text-center d-flex flex-column bg-white" : "custom-menu container-fluid text-center d-flex flex-column bg-white custom-hidden"}>
          <button className="btn border-bottom w-100 btn-warning d-none d-block d-md-none m-0" onClick={this.toClipBoard}>Share this list</button>
          <span className="w-100 border-bottom p-2 btn">More Features Coming!</span>
        </div>

          {this.state.searchOn ?
            <div className="container-fluid text-center bg-white d-none d-block d-md-none p-2">
              {this.props.children}
            </div> : undefined
          }

      </React.Fragment>
    )
  }
}

export default withRouter(Header);
