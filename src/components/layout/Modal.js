import React, {useState} from 'react';

const Modal = ({modalToggleHandler, modalImg}) =>{
  const modalControl = (e) =>{
    if(e.target.tagName === "DIV"){
      modalToggleHandler();
    } else if(e.target.tagName === "SPAN"){
      console.log("Menu is here.");
    }
  }

  return(
    <div className="position-fixed container-fluid vh-100 d-flex justify-content-center align-items-center" style={{zIndex: 9999}} onClick={modalControl}>
        <div className="vw-100 vh-100 bg-faded-black position-absolute" style={{zIndex: 1}}></div>
        <div className="d-flex flex-column align-items-center justify-content-center container--custom h-100" style={{zIndex: 2}}>
          <img src={modalImg} className="img-fluid" alt="Reddit post."/>
          <div className="w-100 d-flex justify-content-end">
            <span style={{transform: "rotate(90deg)", fontSize: "40px"}} className="text-white m-0 btn">&#x2026;</span>
          </div>
        </div>
    </div>
  )
}

export default Modal;
