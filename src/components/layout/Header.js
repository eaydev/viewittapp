import React, {useState} from 'react';
import ModeButton from './ModeButton';
import { useLocation } from "react-router-dom";


const Header = (props) =>{
  const {copyHandler} = props;
  let location = useLocation();

  const [menuState, setMenuState] = useState({
    searchOn: false,
    expanded: false
  });

  const menuToggle = () =>{
    setMenuState({
      searchOn: menuState.searchOn,
      expanded: !menuState.expanded
    })
  }

  const searchToggle = () =>{
    setMenuState({
      searchOn: !menuState.searchOn,
      expanded: menuState.expanded
    })
  }

  const toClipBoard = () =>{
    let listURL = `https://viewittapp.netlify.app${location.pathname}` ;
    //Putting together clipboard message.
    let message = `Check out my list: ${listURL}`;
    //Check clipboard .js
    window.Clipboard.copy(message);
    copyHandler(
      {
      text: "Copied list successfully! 👍",
      type: "info"
      }
    );
  }

  return(
    <React.Fragment>
      <header className={props.darkMode ? "shadow": "border-bottom"}>
        <nav className={props.darkMode ? "navbar navbar-light bg-darkmode-lightblack navbar-expand-md" : "navbar navbar-light bg-light navbar-expand-md"}>
          <div className="d-flex justify-content-start align-items-center">
            <span className={props.darkMode ? "navbar-brand mb-0 text-muted text-darkmode-darkgrey": "navbar-brand mb-0 text-muted cursor-pointer"} onClick={menuToggle}>&#9776; <span style={{fontSize: "20px"}} className="ml-2">MENU</span></span>
            <button className={props.darkMode ? "btn p-0 m-0 ml-lg-4 text-muted mb-1 cursor-pointer": "btn p-0 m-0 ml-lg-4 text-muted mb-1 text-darkmode-darkgrey"} onClick={searchToggle} style={{fontSize: "40px", transform: "rotate(90deg)", fontWeight: "900"}}>&#9740;</button>
          </div>

          {menuState.searchOn ?
            <div className="nav-container-custom text-right navbar-collapse collapse">
              {props.children}
            </div> :

            <React.Fragment>
              <span className={props.darkMode ? "navbar-center-abs navbar-collapse collapse h4 text-darkmode-darkgrey": "navbar-center-abs navbar-collapse collapse h4"}>viewitt</span>
              <div className="nav-container-custom text-right navbar-collapse collapse">
                <span className="mr-auto"></span>
                <button className="btn btn-info m-1" onClick={toClipBoard}>Share this list</button>
                <ModeButton modeToggleHandler={props.darkModeToggle} darkMode={props.darkMode}/>
              </div>
            </React.Fragment>
          }
          <span className="mb-0 h4 navbar-toggler border-0">
            <ModeButton modeToggleHandler={props.darkModeToggle} darkMode={props.darkMode}/>
          </span>



        </nav>
      </header>

      <div className={menuState.expanded ? `container-fluid text-center d-flex flex-column ${props.darkMode ? "bg-darkmode-lightblack": "bg-white"}` : "custom-menu container-fluid text-center d-flex flex-column bg-white custom-hidden"}>
        <button className="btn border-bottom w-100 btn-warning d-none d-block d-md-none m-0 mb-2 mt-2" onClick={toClipBoard}>Share this list</button>
        <span className={props.darkMode ? "w-100 p-2 btn text-darkmode-grey bg-darkmode-lightblack " : "w-100 border-bottom p-2 btn"}>More Features Coming!</span>
      </div>

        {menuState.searchOn ?
          <div className={props.darkMode ? "container-fluid text-center bg-darkmode-lightblack d-none d-block d-md-none p-2" : "container-fluid text-center bg-white d-none d-block d-md-none p-2"}>
            {props.children}
          </div> : undefined
        }

    </React.Fragment>
  )
}

// class Headerold {
//   constructor(props){
//     super(props);
//     state = {
//       searchOn: false,
//       expanded : false
//     }
//     this.menuToggle = this.menuToggle.bind(this);
//     this.searchToggle = this.searchToggle.bind(this);
//     this.toClipBoard = this.toClipBoard.bind(this);
//   }
//
//   menuToggle(){
//     this.setState({expanded: !this.state.expanded});
//   }
//
//   searchToggle(){
//     this.setState({searchOn: !this.state.searchOn});
//   }
//
//   async toClipBoard(){
//     let callBack = this.props.copyHandler;
//     let listURL = `https://viewittapp.netlify.app${this.props.location.pathname}` ;
//     //Putting together clipboard message.
//     let message = `Check out my list: ${listURL}`;
//     //Check clipboard .js
//     await window.Clipboard.copy(message);
//     callBack("Copied list successfully! 👍", "info");
//   }
//
//   render(){
//     return(
//       <React.Fragment>
//         <header className={this.props.darkMode ? "shadow": "border-bottom"}>
//           <nav className={this.props.darkMode ? "navbar navbar-light bg-darkmode-lightblack navbar-expand-md" : "navbar navbar-light bg-light navbar-expand-md"}>
//             <div className="d-flex justify-content-start align-items-center">
//               <span className={this.props.darkMode ? "navbar-brand mb-0 text-muted text-darkmode-darkgrey": "navbar-brand mb-0 text-muted cursor-pointer"} onClick={this.menuToggle}>&#9776; <span style={{fontSize: "20px"}} className="ml-2">MENU</span></span>
//               <button className={this.props.darkMode ? "btn p-0 m-0 ml-lg-4 text-muted mb-1 cursor-pointer": "btn p-0 m-0 ml-lg-4 text-muted mb-1 text-darkmode-darkgrey"} onClick={this.searchToggle} style={{fontSize: "40px", transform: "rotate(90deg)", fontWeight: "900"}}>&#9740;</button>
//             </div>
//
//             {this.state.searchOn ?
//               <div className="nav-container-custom text-right navbar-collapse collapse">
//                 {this.props.children}
//               </div> :
//
//               <React.Fragment>
//                 <span className={this.props.darkMode ? "navbar-center-abs navbar-collapse collapse h4 text-darkmode-darkgrey": "navbar-center-abs navbar-collapse collapse h4"}>viewitt</span>
//                 <div className="nav-container-custom text-right navbar-collapse collapse">
//                   <span className="mr-auto"></span>
//                   <button className="btn btn-info m-1" onClick={this.toClipBoard}>Share this list</button>
//                   <ModeButton modeToggleHandler={this.props.darkModeToggle} darkMode={this.props.darkMode}/>
//                 </div>
//               </React.Fragment>
//             }
//             <span className="mb-0 h4 navbar-toggler border-0">
//               <ModeButton modeToggleHandler={this.props.darkModeToggle} darkMode={this.props.darkMode}/>
//             </span>
//
//
//
//           </nav>
//         </header>
//
//         <div className={this.state.expanded ? `container-fluid text-center d-flex flex-column ${this.props.darkMode ? "bg-darkmode-lightblack": "bg-white"}` : "custom-menu container-fluid text-center d-flex flex-column bg-white custom-hidden"}>
//           <button className="btn border-bottom w-100 btn-warning d-none d-block d-md-none m-0 mb-2 mt-2" onClick={this.toClipBoard}>Share this list</button>
//           <span className={this.props.darkMode ? "w-100 p-2 btn text-darkmode-grey bg-darkmode-lightblack " : "w-100 border-bottom p-2 btn"}>More Features Coming!</span>
//         </div>
//
//           {this.state.searchOn ?
//             <div className="container-fluid text-center bg-white d-none d-block d-md-none p-2">
//               {this.props.children}
//             </div> : undefined
//           }
//
//       </React.Fragment>
//     )
//   }
// }

export default Header;
